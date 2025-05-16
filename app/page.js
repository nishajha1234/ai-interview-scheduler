'use client';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider";
import { useEffect, useState } from "react";
import { supabase } from "@/Services/supabaseClient";

export default function Page() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleDashboardClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };

  // ❗️Don’t render anything until auth is checked
  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <div className="bg-white text-gray-800">
      {/* Your actual page content */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white min-h-[50vh] py-16 px-16 md:px-20">
        <div className="flex flex-col lg:flex-row gap-10 h-full">

          {/* Left Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight pt-4">
              AI-Powered <span className="text-blue-600">Interview Assistant</span> for Modern Recruiters
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match.
              Save time, reduce bias, and improve your hiring process.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:gap-4 justify-start">
              <button 
                onClick={handleDashboardClick} 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer"
              >
                <span className="flex flex-row gap-2">Create Interview <ArrowRight className="pt-1" /></span>
              </button>
              {/* <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 mt-3 sm:mt-0 cursor-pointer">
                Watch Demo
              </button> */}
            </div>
          </div>

          {/* Right Section */}
          <div className="group relative cursor-pointer mt-15 ml-10">
            <Image
              src="/dashboard-screenshot1.png"
              alt="Hero Video"
              width={1920}
              height={1080}
              className="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.9]"
            />
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold pt-30">Streamline Your Hiring Process</h2>
        <p className="mb-12 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
          AiCruiter helps you save time and find better candidates with our advanced AI interview technology.
        </p>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl text-blue-600 mb-4">🕒</div>
            <h3 className="text-xl font-semibold">Save Time</h3>
            <p className="text-gray-600 mt-2">
              Automate initial screening interviews and focus on final candidates.
            </p>
          </div>
          <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl text-blue-600 mb-4">📊</div>
            <h3 className="text-xl font-semibold">Data-Driven Insights</h3>
            <p className="text-gray-600 mt-2">
              Get detailed analytics and candidate comparisons based on interview responses.
            </p>
          </div>
          <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl text-blue-600 mb-4">👥</div>
            <h3 className="text-xl font-semibold">Reduce Bias</h3>
            <p className="text-gray-600 mt-2">
              Standardized interviews help eliminate unconscious bias in the hiring process.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-10 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold pt-30">How AiCruiter Works</h2>
        <p className="mb-20 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
          Three simple steps to transform your recruitment process
        </p>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 text-xl font-bold">
                1
              </div>
            </div>
            <h3 className="text-xl font-bold">Create Interview</h3>
            <p className="text-gray-600 mt-2">
              Set up your job requirements and customize interview questions.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 text-xl font-bold">
                2
              </div>
            </div>
            <h3 className="text-xl font-bold">Share with Candidates</h3>
            <p className="text-gray-600 mt-2">
              Send interview links to candidates to complete at their convenience.
            </p>
          </div>
          <div className="pb-20">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 text-xl font-bold">
                3
              </div>
            </div>
            <h3 className="text-xl font-bold">Review Results</h3>
            <p className="text-gray-600 mt-2">
              Get AI-analyzed results, transcripts, and candidate comparisons.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold">Ready to Transform Your Hiring Process?</h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed mb-8">
          Join hundreds of companies already using AiCruiter to find the best talent.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={handleDashboardClick} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
