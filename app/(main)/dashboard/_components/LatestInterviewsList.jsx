"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/Services/supabaseClient';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';

function LatestInterviewsList() {
    const [interviewList, setInterviewList]=useState([]);
    const {user}=useUser();

    useEffect(()=>{
      user && GetInterviewList();
    },[user])

    const GetInterviewList=async()=>{
      let { data: Interviews, error } = await supabase
  .from('Interviews')
  .select('*,interview-feedback(*)')
  .eq('userEmail',user?.email)
  .order('id',{ascending:false})
  .limit(6)
;
  console.log(Interviews);
  setInterviewList(Interviews);
    }

  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'>
            Previously Created Interviews
        </h2>
        {interviewList?.length==0&&
        <div className='p-5 flex flex-col gap-3 items-center bg-white mt-5'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You don't have any interview created!</h2>
            <Button className="cursor-pointer">+ Create New Interview</Button>
        </div>
        }
        {interviewList&&
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5  gap-5'>
          {interviewList.map((interview,index)=>(
            <InterviewCard interview={interview} key={index}/>
          ))}
        </div>
        }
    </div>
  )
}

export default LatestInterviewsList