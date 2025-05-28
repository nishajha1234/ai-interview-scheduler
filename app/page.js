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

  if (loading) {
    return null;
  }

  return (
    <div className="bg-white text-gray-800">
      <Header />
      <section className="bg-gradient-to-b from-blue-50 to-white min-h-[50vh] py-12 px-4 sm:px-8 md:px-16">
        <div className="flex flex-col lg:flex-row gap-10 h-full">
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight pt-4">
              Revolutionize Hiring with <br/> <span className="text-blue-600">AI-Driven Interviews</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Harness cutting-edge AI to streamline candidate assessments and focus your energy on meaningful decision-making. Make hiring faster, smarter, and fairer.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:gap-4 justify-start">
              <button
                onClick={handleDashboardClick}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer"
              >
                <span className="flex flex-row gap-2">Start Interview <ArrowRight className="pt-1" /></span>
              </button>
            </div>
          </div>

          <div className="group relative cursor-pointer mt-10 lg:mt-0 w-full lg:w-1/2">
            <Image
              src="/dashboard-screenshot1.png"
              alt="Hero Screenshot"
              width={1920}
              height={1080}
              className="w-full h-auto rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.9] sm:mt-0 lg:mt-20"
            />
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold pt-8 pb-2 md:pb-0">Enhance Your Hiring Efficiency</h2>
        <p className="mb-12 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
          AiCruiter leverages voice AI and data analytics to reduce recruitment friction and help you select the best-fit candidates faster.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl text-blue-600 mb-4">⚡</div>
            <h3 className="text-xl font-semibold">Accelerate Screening</h3>
            <p className="text-gray-600 mt-2">
              Quickly filter out unsuitable candidates with AI-powered voice interviews, freeing up your time.
            </p>
          </div>
          <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="text-4xl text-blue-600 mb-4">🔍</div>
            <h3 className="text-xl font-semibold">Insightful Reporting</h3>
            <p className="text-gray-600 mt-2">
              Receive comprehensive reports summarizing candidate strengths and areas for improvement.
            </p>
          </div>
          <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition sm:col-span-2 sm:mx-auto md:col-span-1">
            <div className="text-4xl text-blue-600 mb-4">🤝</div>
            <h3 className="text-xl font-semibold">Equal Opportunity</h3>
            <p className="text-gray-600 mt-2">
              Implement unbiased interviews that promote diversity and fairness in your hiring process.
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-37 py-20 px-4 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold pb-2 md:pb-0">How AiCruiter Simplifies Recruitment</h2>
        <p className="mb-20 mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
          A simple, three-step workflow designed to improve recruitment outcomes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 text-xl font-bold">
                1
              </div>
            </div>
            <h3 className="text-xl font-bold">Design Your Interview</h3>
            <p className="text-gray-600 mt-2">
              Craft customized questions to evaluate candidate skills and culture fit.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 text-xl font-bold">
                2
              </div>
            </div>
            <h3 className="text-xl font-bold">Distribute Interview Links</h3>
            <p className="text-gray-600 mt-2">
              Share easy-to-access links that candidates can complete anytime, anywhere.
            </p>
          </div>
          <div className="pb-10 sm:col-span-2 sm:mx-auto sm:mt-0 md:col-span-1">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 text-xl font-bold">
                3
              </div>
            </div>
            <h3 className="text-xl font-bold">Evaluate & Decide</h3>
            <p className="text-gray-600 mt-2">
              Analyze AI-assisted results and make informed hiring decisions with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold pb-2 md:pb-0">Transform Your Hiring Today</h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed mb-8">
          Countless companies using AiCruiter's to hire more efficiently and fairly.
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

      <Footer />
    </div>
  );
}
