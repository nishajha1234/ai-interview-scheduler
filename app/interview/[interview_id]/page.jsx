"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { supabase } from '@/Services/supabaseClient';
import { Clock, Info, Loader2Icon, Video } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetails();
    }
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select("jobPosition,jobDescription,duration,type")
        .eq('interview_id', interview_id);
      if (error || !Interviews || Interviews.length === 0) {
        toast.error('Incorrect Interview Link');
        setLoading(false);
        return;
      }
      setInterviewData(Interviews[0]);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error('Incorrect Interview Link');
    }
  };

  const onJoinInterview = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,12}$/;

    if (!userName || !userEmail || !userPhone) {
      toast.error('Please fill in all the fields');
      return;
    }

    if (!emailRegex.test(userEmail)) {
      toast.error('Invalid email address');
      return;
    }

    if (!phoneRegex.test(userPhone)) {
      toast.error('Invalid phone number (10-12 digits only)');
      return;
    }

    setLoading(true);
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('interview_id', interview_id);

    if (error || !Interviews || Interviews.length === 0) {
      toast.error('Interview data not found');
      setLoading(false);
      return;
    }

    setInterviewInfo({
      userName,
      userEmail,
      userPhone,
      interviewData: Interviews[0]
    });
    router.push('/interview/' + interview_id + '/start');
    sessionStorage.setItem('interview_allowed', 'true');
    setLoading(false);
  };


  return (
    <div className="px-4 sm:px-6 md:px-20 lg:px-32 xl:px-48 mt-7 pb-20 max-w-5xl mx-auto">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-6 sm:p-10 space-y-6 shadow-md">
        <Image src={'/logo.png'} alt='logo' width={200} height={50} className='w-32 sm:w-36' />
        <h2 className='text-center text-lg sm:text-xl font-semibold'>AI-Powered Interview Platform</h2>
        <Image src={'/interview.png'} alt='interview' width={500} height={500} className='w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto' />

        <h2 className='font-bold text-xl sm:text-2xl text-center'>{interviewData?.jobPosition || 'Loading...'}</h2>
        <h2 className='flex gap-2 items-center text-gray-500 justify-center'>
          <Clock className='h-4 w-4' />
          {interviewData?.duration || '-'}
        </h2>

        <div className="w-full space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="userName">Enter your full name</label>
            <Input
              id="userName"
              placeholder='e.g. John Smith'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="userEmail">Enter your Email</label>
            <Input
              id="userEmail"
              placeholder='e.g. john@gmail.com'
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="userPhone">Enter your Phone Number</label>
            <Input
              id="userPhone"
              placeholder='e.g. 9876543210'
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className='p-4 bg-blue-100 flex gap-4 rounded-lg mt-4 max-w-full'>
          <Info className='text-primary shrink-0' />
          <div>
            <h3 className='font-bold mb-1'>Before you begin</h3>
            <ul className="list-disc list-inside text-primary text-sm sm:text-base">
              <li>Test your microphone here: <a href="https://mictests.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://mictests.com</a></li>
              <li>Ensure you have a stable internet connection</li>
              <li>Find a quiet place for interview</li>
            </ul>
          </div>
        </div>

        <Button
          className='mt-6 w-full font-bold cursor-pointer flex items-center justify-center gap-2'
          disabled={loading || !userName || !userEmail || !userPhone}
          onClick={onJoinInterview}
        >
          <Video />
          {loading && <Loader2Icon className="animate-spin" />}
          Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
