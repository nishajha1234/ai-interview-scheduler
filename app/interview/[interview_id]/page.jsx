"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { supabase } from '@/Services/supabaseClient'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

function Interview() {

    const { interview_id } = useParams();
    console.log(interview_id);
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [userEmail,setUserEmail]=useState();
    const [userPhone, setUserPhone] = useState();

    const [loading, setLoading] = useState(false);
    const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);
    const router=useRouter();

    useEffect(() => {
        interview_id && GetInterviewDetails();
    }, [interview_id])

    const GetInterviewDetails = async () => {
        setLoading(true);
        try {
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select("jobPosition,jobDescription,duration,type")
                .eq('interview_id', interview_id)
            setInterviewData(Interviews[0]);
            setLoading(false);
            if (Interviews?.length == 0) {
                toast('Incorrect Interview Link')
                return;
            }
        }
        catch (e) {
            setLoading(false);
            toast('Incorrect Interview Link')
        }
    }

    const onJoinInterview=async()=>{
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
        let {data: Interviews, error}= await supabase
        .from('Interviews')
        .select('*')
        .eq('interview_id',interview_id);

        console.log(Interviews[0]);
        setInterviewInfo({
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            interviewData: Interviews[0]
        });
        router.push('/interview/' + interview_id + '/start')
        setLoading(false);
    }

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7 pb-40'>
            <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52 pb-15'>
                <Image src={'/logo.png'} alt='logo' width={200} height={50} className='w-[140px]' />
                <h2 className='mt-3'>AI-Powered Interview Platform</h2>
                <Image src={'/interview.png'} alt='interview' width={500} height={500} className='w-[280px] my-6' />

                <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4' />{interviewData?.duration}</h2>

                <div className='w-full'>
                    <h2>Enter your full name</h2>
                    <Input placeholder='e.g. Jhon Smity' onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className='w-full'>
                    <h2>Enter your Email</h2>
                    <Input placeholder='e.g. jhon@gmail.com' onChange={(event) => setUserEmail(event.target.value)} />
                </div>
                <div className='w-full'>
    <h2>Enter your Phone Number</h2>
    <Input
        placeholder='e.g. 9876543210'
        onChange={(event) => setUserPhone(event.target.value)}
    />
</div>


                <div className='p-3 bg-blue-100 flex gap-4 rounded-lg mt-6'>
                    <Info className='text-primary' />
                    <div>
                        <h2 className='font-bold'>Before you begin</h2>
                        <ul>
                            <li className='text-sm text-primary'>Test your camera and microphone</li>
                            <li className='text-sm text-primary'>Ensure you have a stable internet connection</li>
                            <li className='text-sm text-primary'>Find a Quiet place for interview</li>
                        </ul>
                    </div>
                </div>

                <Button className={'mt-5 w-full font-bold cursor-pointer'} disabled={loading || !userName} onClick={() => onJoinInterview()}><Video />{loading && <Loader2Icon/>}Join Interview</Button>
            </div>
        </div>
    )
}

export default Interview