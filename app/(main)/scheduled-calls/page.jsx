"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/Services/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Phone, X } from "lucide-react";
import { useUser } from "@/app/provider";
import { useRouter } from "next/navigation";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/45 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg px-8 py-5 sm:px-10 sm:py-8 max-w-md sm:w-full w-auto border border-gray-300 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="cursor-pointer hidden sm:block absolute top-4 right-4 px-3 py-1 hover:text-red-900 transition"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function PhoneScreenings() {
  const { user, loading: authLoading } = useUser();

  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth');
    }
  }, [authLoading, user]);


  useEffect(() => {
    const fetchCandidates = async () => {
      setIsLoading(true);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        setIsLoading(false);
        return;
      }

      const userId = session.user.id;

      console.log("Supabase Auth User ID:", userId);

      let query = supabase.from("candidates").select("*").eq("user_id", userId);

      if (filter === "latest") {
        query = query.order("created_at", { ascending: false });
      } else {
        query = query
          .order("screening_date", { ascending: true })
          .order("screening_time", { ascending: true });
      }

      const { data, error } = await query;

      if (error) {
        toast.error("Failed to fetch candidates");
        console.error("Supabase fetch error:", error);
      } else {
        setCandidates(data);
      }

      setIsLoading(false);
    };

    if (!authLoading) {
      fetchCandidates();
    }
  }, [filter, authLoading]);


  const openModal = (candidate) => setSelectedCandidate(candidate);
  const closeModal = () => setSelectedCandidate(null);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hourStr, minute] = timeString.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  const sendMail = () => {
    if (!selectedCandidate) return;
    const subject = encodeURIComponent(
      `Congratulations, ${selectedCandidate.name}! Your Phone Screening Interview is Scheduled`
    );
    const body = encodeURIComponent(`
Hi ${selectedCandidate.name},

Congratulations!
We've scheduled a phone interview to discuss your application further. Please find the details below:

📅 Date: ${selectedCandidate.screening_date}
⏰ Time: ${formatTime(selectedCandidate.screening_time)}
📞 Phone: ${selectedCandidate.phone}

A member of our recruitment team will call you at the scheduled time.

Please be available in a quiet location during the call. If you need to reschedule or have questions, feel free to reply to this email.

Best regards,
AiRecruiter Team
`);

    window.location.href = `mailto:${selectedCandidate.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 mt-5">
        <h1 className="text-2xl font-bold">Scheduled Phone Screenings</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="cursor-pointer"
            variant={filter === "upcoming" ? "default" : "outline"}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming Soon
          </Button>
          <Button
            className="cursor-pointer"
            variant={filter === "latest" ? "default" : "outline"}
            onClick={() => setFilter("latest")}
          >
            Latest Created
          </Button>
        </div>
      </div>

      {authLoading || !user ? null : isLoading ? (
        <p>Loading...</p>
      ) : candidates.length === 0 ? (
        <div className="p-5 flex flex-col gap-3 items-center bg-white mt-5">
          <Phone className="h-10 w-10 text-primary" />
          <h2 >You don't have any scheduled calls!</h2>
          <Button
            onClick={() => router.push("/dashboard/create-phone-screening-call")}
            className="cursor-pointer"
          >
            + Schedule Call
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {candidates.map((c) => (
            <div
              key={c.id}
              className="p-5 bg-white rounded-lg border flex flex-col md:flex-row md:justify-between md:items-center shadow-sm"
            >
              <div className="font-sans">
                <div className="font-semibold text-lg">{c.name}</div>
                <div className="text-sm text-gray-600">{c.email}</div>
                <div className="text-sm text-gray-700 pt-3">
                  📅 {c.screening_date} ⏰ {formatTime(c.screening_time)}
                </div>
              </div>
              <Button
                className="mt-4 md:mt-0 md:ml-4 cursor-pointer"
                onClick={() => openModal(c)}
                size="sm"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!selectedCandidate} onClose={closeModal}>
        {selectedCandidate && (
          <div className="font-sans text-gray-900">
            <button
              onClick={closeModal}
              className="sm:hidden absolute top-0 right-3 py-4 text-red-900"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mt-5 sm:mt-0 mb-5 text-center">
              Candidate Details
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {selectedCandidate.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedCandidate.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedCandidate.phone}
              </p>
              <p>
                <strong>Date:</strong> {selectedCandidate.screening_date}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {formatTime(selectedCandidate.screening_time)}
              </p>
            </div>
            <Button
              className="mt-6 w-full bg-primary cursor-pointer"
              onClick={sendMail}
            >
              Notify Candidate
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
