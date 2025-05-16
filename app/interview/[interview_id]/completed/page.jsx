import React from 'react';
import { Home, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const InterviewComplete = () => {
  return (
    <div className="bg-white text-white font-sans antialiased flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-8 py-16">
        {/* Success Icon */}
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


        {/* Heading */}
        <h1 className="text-4xl text-black font-bold text-center mt-[-20px]">Interview Complete!</h1>

        {/* Subheading */}
        <p className="text-lg text-gray-500 text-center mt-[-20px]">
          Thank you for participating in the AI-driven interview with Alcruiter.
        </p>

        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-xl w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto border border-gray-200 ">
          <Image
            src="/completed.jpeg"
            alt="logo"
            width={1000}
            height={400}
            className="w-full h-38 sm:h-46 md:h-54 lg:h-62 xl:h-70 object-cover"
          />
        </div>




        {/* Next Steps */}
        <div className="bg-midnightLighter rounded-xl p-8 shadow-md w-full max-w-xl space-y-4">
          <div className="flex items-center justify-center rounded-full w-12 h-12 mx-auto">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)"></circle> <path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white"></path> <defs> <linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse"> <stop stopColor="#37BBFE"></stop> <stop offset="1" stopColor="#007DBB"></stop> </linearGradient> </defs> </g></svg>
          </div>

          <h2 className="text-black text-2xl font-semibold text-center">What's Next?</h2>
          <p className="text-gray-600 text-center">
            The recruiter will review your interview responses and will contact you soon regarding the next steps.
          </p>
          <p className="text-gray-500 text-sm text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Response within 2-3 business days
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-midnightLighter text-gray-500 text-center py-4">
        <p>&copy; 2023 Alcruiter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InterviewComplete;
