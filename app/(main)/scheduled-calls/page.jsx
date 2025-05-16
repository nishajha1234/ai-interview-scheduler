"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/Services/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { X } from "lucide-react";

// Simple modal component
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/45 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg px-10 py-8 max-w-md w-full border border-gray-300 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button inside the box */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 px-3 py-1 hover:text-red-900 transition"
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
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming"); // "upcoming" | "latest"


  const [selectedCandidate, setSelectedCandidate] = useState(null);

 useEffect(() => {
  const fetchCandidates = async () => {
    let query = supabase.from("candidates").select("*");

    if (filter === "latest") {
      query = query.order("created_at", { ascending: false });
    } else {
      // Order by date, then time for upcoming
      query = query
        .order("screening_date", { ascending: true })
        .order("screening_time", { ascending: true });
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching candidates:", error);
      toast.error("Failed to fetch candidates");
    } else {
      setCandidates(data);
    }

    setLoading(false);
  };

  fetchCandidates();
}, [filter]);


  const openModal = (candidate) => setSelectedCandidate(candidate);
  const closeModal = () => setSelectedCandidate(null);

 const formatTime = (timeString) => {
  if (!timeString) return "";
  const [hourStr, minute] = timeString.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert hour '0' to 12 for 12 AM
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
      <div className="flex justify-between items-center mb-6 mt-5">
  <h1 className="text-2xl font-bold">Scheduled Phone Screenings</h1>

  <div className="flex gap-3">
    <Button
      variant={filter === "upcoming" ? "default" : "outline"}
      onClick={() => setFilter("upcoming")}
    >
      Upcoming Soon
    </Button>
    <Button
      variant={filter === "latest" ? "default" : "outline"}
      onClick={() => setFilter("latest")}
    >
      Latest Created
    </Button>
  </div>
</div>


      {loading ? (
        <p>Loading...</p>
      ) : candidates.length === 0 ? (
        <p>No candidates scheduled.</p>
      ) : (
        <div className="grid gap-4">
          {candidates.map((c) => (
            <div
              key={c.id}
              className="p-5 bg-white rounded-lg border flex justify-between items-center shadow-sm"
            >
              <div className="font-sans">
                <div className="font-semibold text-lg">{c.name}</div>
                <div className="text-sm text-gray-600">{c.email}</div>
                <div className="text-sm text-gray-700 pt-3">
                  📅 {c.screening_date} ⏰ {formatTime(c.screening_time)}
                </div>
              </div>
              <Button
                className="ml-4 cursor-pointer"
                onClick={() => openModal(c)}
                size="sm"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={!!selectedCandidate} onClose={closeModal}>
        {selectedCandidate && (
          <div className="font-sans text-gray-900">
            <h2 className="text-2xl font-bold mb-5 text-center">Candidate Details</h2>

            <div className="space-y-3">
              <p><strong>Name:</strong> {selectedCandidate.name}</p>
              <p><strong>Email:</strong> {selectedCandidate.email}</p>
              <p><strong>Phone Number:</strong> {selectedCandidate.phone}</p>
              <p><strong>Date:</strong> {selectedCandidate.screening_date}</p>
              <p><strong>Time:</strong> {formatTime(selectedCandidate.screening_time)}</p>
            </div>

            <Button className="mt-6 w-full bg-primary cursor-pointer" onClick={sendMail}>
              Notify Candidate
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
