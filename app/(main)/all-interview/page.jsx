"use client";

import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/Services/supabaseClient';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import InterviewCard from '../dashboard/_components/InterviewCard';
import { useRouter } from 'next/navigation';

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth');
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (!authLoading && user) {
      GetInterviewList();
    }
  }, [authLoading, user]);

  const GetInterviewList = async () => {
    setIsLoading(true);
    const { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*,interview-feedback(*)')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching interviews:', error);
      setInterviewList([]);
    } else {
      setInterviewList(Interviews || []);
    }
    setIsLoading(false);
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl">All Previously Created Interviews</h2>

      {authLoading || isLoading ? (
        <p className="mt-4">Loading...</p>
      ) : interviewList.length === 0 ? (
        <div className="p-5 flex flex-col gap-3 items-center bg-white mt-5">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button onClick={() => router.push('/dashboard/create-interview')} className="cursor-pointer">
            + Create New Interview
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllInterview;
