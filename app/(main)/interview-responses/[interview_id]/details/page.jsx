"use client";
import { useUser } from '@/app/provider';
import { supabase } from '@/Services/supabaseClient';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function InterviewDetail() {
  const router = useRouter();
  const { interview_id } = useParams();
  const { user, loading } = useUser();
  const [interviewDetail, setInterviewDetail] = useState();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      GetInterviewDetail();
    }
  }, [user]);

  const GetInterviewDetail = async () => {
    const result = await supabase
      .from('Interviews')
      .select(
        `jobPosition, jobDescription, type, questionList, duration, interview_id, created_at, 
         interview-feedback(userEmail, userName, userPhone, feedback, created_at)`
      )
      .eq('userEmail', user?.email)
      .eq('interview_id', interview_id);

    setInterviewDetail(result.data ? result.data[0] : null);
    console.log(result);
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="mt-5">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Interview Detail</h2>
      </div>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList candidateList={interviewDetail?.['interview-feedback']} />
    </div>
  );
}

export default InterviewDetail;
