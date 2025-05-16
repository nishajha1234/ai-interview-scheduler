"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Vapi from "@vapi-ai/web";
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/Services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import TimerComponent from './_components/TimerComponent';

function StartInterview() {
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    const [activeUser, setActiveUser] = useState(false);
    const [conversation, setConversation] = useState();
    const [loading, setLoading] = useState(false);
    const { interview_id } = useParams();
    const router = useRouter();
    const vapiRef = useRef(null);
    const [feedbackGenerated, setFeedbackGenerated] = useState(false);
    const toastIdRef = useRef(null);

    const callStartedRef = useRef(false);
    const callEndedRef = useRef(false);
    const messageLoggedRef = useRef(false);
    const speechStartRef = useRef(false);
    const speechEndRef = useRef(false);
    const [callActive, setCallActive] = useState(false);

    useEffect(() => {
        if (!vapiRef.current) {
            vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
        }
        const vapi = vapiRef.current;
        if (!toastIdRef.current) {
            toastIdRef.current = toast.loading("Connecting to AI Recruiter ...");
        }

        const handleMessage = (message) => {
            if (!messageLoggedRef.current) {
                console.log('Message:', message);
                messageLoggedRef.current = true;
            }
            if (message?.conversation) {
                const convoString = JSON.stringify(message.conversation);
                console.log('Conversation string:', convoString);
                setConversation(convoString);
            }
        };

        vapi.on("message", handleMessage);

        vapi.on("call-start", () => {
            if (!callStartedRef.current) {
                if (toastIdRef.current) {
                    toast.dismiss(toastIdRef.current);
                    toastIdRef.current = null;
                }
                console.log("Call has started.");
                toast('Call Connected...');
                callStartedRef.current = true;
                setCallActive(true);
            }
        });

        vapi.on("speech-start", () => {
            if (!speechStartRef.current) {
                console.log("Assistant speech has started.");
                speechStartRef.current = true;
            }
            setActiveUser(false);
        });

        vapi.on("speech-end", () => {
            if (!speechEndRef.current) {
                console.log("Assistant speech has ended.");
                speechEndRef.current = true;
            }
            setActiveUser(true);
        });

        vapi.on("call-end", () => {
            if (!callEndedRef.current) {
                console.log("Call has ended.");
                toast('Interview Ended');
                setCallActive(false);
                setTimeout(() => {
                    toast.loading("Generating feedback... Please wait", { id: "feedback-toast" });
                }, 5000);
                GenerateFeedback();
                callEndedRef.current = true;
            }
        });

        // Clean up the listener
        return () => {
            vapi.off("message", handleMessage);
            vapi.off('call-start', () => console.log("END"));
            vapi.off('speech-start', () => console.log("END"));
            vapi.off('speech-end', () => console.log("END"));
            vapi.off('call-end', () => console.log("END"));
        };
    }, []);

    useEffect(() => {
        interviewInfo && startCall();
    }, [interviewInfo]);

    const startCall = () => {
        let questionList;
        interviewInfo?.interviewData?.questionList.forEach((item, index) => (
            questionList = item?.question + "," + questionList
        ));

        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi " + interviewInfo?.userName + ", how are you? Ready for your interview on " + interviewInfo?.interviewData?.jobPosition + " ?",
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
    You are an AI voice assistant conducting interviews.
    Your job is to ask candidates provided interview questions, assess their responses.
    Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
    "Hey there! Welcome to your `+ interviewInfo?.interviewData?.jobPosition + ` interview. Let's get started with a few questions!"
    Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
    Questions: ` + questionList + `
    If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
    "Need a hint? Think about how React tracks component updates!"
    Provide brief, encouraging feedback after each answer. Example:
    "Nice! That's a solid answer."
    "Hmm, not quite! Want to try again?"
    Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
    After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
    "That was great! You handled some tough questions well. Keep sharpening your skills!"
    End on a positive note:
    "Thanks for chatting! Hope to see you crushing projects soon!"
    Key Guidelines:
    Be friendly, engaging, and witty
    Keep responses short and natural, like a real conversation
    Adapt based on the candidate's confidence level
    Ensure the interview remains focused on React
    `.trim(),
                    },
                ],
            },
        };

        vapiRef.current?.start(assistantOptions)
    }

    const stopInterview = async () => {
        setLoading(true);
        try {
            await vapiRef.current?.stop();
        } finally {
            setLoading(false);
        }
    }

    const GenerateFeedback = async () => {
        if (feedbackGenerated) return;
        setFeedbackGenerated(true);
        const result = await axios.post('/api/ai-feedback', {
            conversation: conversation
        })
        console.log(result?.data);
        const Content = result.data.content;
        const FINAL_CONTENT = Content.replace('```json', '').replace('```', '')
        console.log(FINAL_CONTENT);

         const parsedContent = JSON.parse(FINAL_CONTENT);

    const { technicalSkills, communication, problemSolving, experience } = parsedContent?.feedback?.rating;
    const overallRating = ((technicalSkills + communication + problemSolving + experience) / 4).toFixed(2);
    parsedContent.feedback.rating.overallRating = parseFloat(overallRating);

  
        
        // Save to Database
        const { data, error } = await supabase
            .from('interview-feedback')
            .insert([
                {
                    userName: interviewInfo?.userName,
                    userEmail: interviewInfo?.userEmail,
                    userPhone: interviewInfo?.userPhone,
                    interview_id: interview_id,
                    feedback: parsedContent,
                    recommended: parsedContent.feedback.Recommendation ?? false,
                },
            ])
            .select()
        console.log(data);
        toast.dismiss("feedback-toast");
        router.replace('/interview/' + interview_id + "/completed");

    }

    return (
        <div className='p-20 lg:px-48 xl:px-56'>
            <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
                <span className='flex gap-2 items-center'>
                    <Timer />
                    <TimerComponent start={callActive} />
                </span>
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}
                        <Image src={'/ai.jpg'} alt='ai' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-cover' />
                    </div>
                    <h2>AI Recruiter</h2>
                </div>
                <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}
                        <h2 className='text-2xl bg-primary text-white h-[50px] w-[50px] rounded-full flex items-center justify-center'>{interviewInfo?.userName[0]}</h2>
                    </div>
                    <h2 className=''>{interviewInfo?.userName}</h2>
                </div>
            </div>

            <div className='flex items-center gap-5 justify-center mt-7'>
                <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
                {!loading ? <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer' onClick={() => stopInterview()} /> : <Loader2Icon className='animate-spin' />}
            </div>
            {callActive && (<h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress...</h2>)}
        </div>
    )
}

export default StartInterview
