"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const InterviewComplete = () => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const { interview_id } = useParams();

  useEffect(() => {
    const interviewStarted = sessionStorage.getItem('interview_started');

    if (interviewStarted === 'true') {
      setAllowed(true);
      setTimeout(() => {
        sessionStorage.removeItem('interview_started');
      }, 1000);
    } else {
      router.replace('/interview/' + interview_id);
    }
  }, []);

  if (!allowed) {
    return <div className='bg-white p-10'>Loading...</div>;
  }

  return (
    <div className="bg-white font-sans antialiased flex flex-col min-h-screen text-black">
      <main className="flex-grow flex flex-col items-center justify-center space-y-8 py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 max-w-5xl mx-auto">
        <div className="rounded-full bg-green-500 p-4 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-center -mt-5">Interview Complete!</h1>

        <p className="text-base sm:text-lg text-gray-600 text-center -mt-4 max-w-xl">
          Thank you for participating in the AI-driven interview with Alcruiter.
        </p>

        <div className="rounded-xl overflow-hidden shadow-xl w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto border border-gray-200">
          <Image
            src="/completed.jpeg"
            alt="Interview Complete"
            width={1000}
            height={400}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover"
            priority
          />
        </div>

        <section className="bg-midnightLighter rounded-xl p-6 sm:p-8 shadow-md w-full max-w-xl space-y-4 text-center">
          <div className="flex items-center justify-center rounded-full w-12 h-12 mx-auto mb-2">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
              <g id="SVGRepo_iconCarrier">
                <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)"></circle>
                <path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white"></path>
                <defs>
                  <linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#37BBFE"></stop>
                    <stop offset="1" stopColor="#007DBB"></stop>
                  </linearGradient>
                </defs>
              </g>
            </svg>
          </div>

          <h2 className="text-2xl font-semibold">What's Next?</h2>
          <p className="text-gray-600">
            The recruiter will review your interview responses and will contact you soon regarding the next steps.
          </p>
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1 mx-auto max-w-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Response within 2-3 business days
          </p>
        </section>
      </main>

      <footer className="bg-midnightLighter text-gray-500 text-center py-4">
        <p>&copy; 2023 Alcruiter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InterviewComplete;
