import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'next/navigation';

function CandidateFeedbackDialog({ candidate }) {
    const router = useRouter();
    const feedback = candidate?.feedback?.feedback

    const handleSchedule = () => {
        const query = new URLSearchParams({
            name: candidate.userName || '',
            email: candidate.userEmail || '',
            phone: candidate.userPhone || '',
        }).toString();
        router.push(`/dashboard/create-phone-screening-call?${query}`);
    };

    const handleReject = () => {
        const subject = encodeURIComponent("Regarding Your Interview with AiCruiter");
        const body = encodeURIComponent(`
Hi ${candidate.userName},

Thank you for taking the time to interview for the position at AiCruiter.

After careful consideration, we will not be moving forward with your application at this time. We appreciate your interest and effort and encourage you to apply for future openings that match your skills.

Wishing you all the best in your job search.

Best regards,  
AiCruiter Recruitment Team
  `);

        window.location.href = `mailto:${candidate.userEmail}?subject=${subject}&body=${body}`;
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' className="text-primary cursor-pointer">View Report</Button>
            </DialogTrigger>
            <DialogContent className="max-w-full sm:max-w-3xl p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription className="max-w-full sm:max-w-3xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto" asChild>
                        <div className='mt-5 space-y-6'>

                            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5'>
                                <div className='flex items-center gap-4'>
                                    <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full text-2xl w-14 h-14 flex items-center justify-center'>
                                        {candidate.userName[0]}
                                    </h2>
                                    <div>
                                        <h2 className='font-bold text-left text-lg'>{candidate?.userName}</h2>
                                        <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                                    </div>
                                </div>
                                <div className='flex items-center justify-start sm:justify-end'>
                                    <h2 className='text-primary text-xl sm:text-3xl font-bold'>
                                        <span>{feedback?.rating?.overallRating ?? '?'}/10</span>
                                    </h2>
                                </div>
                            </div>

                            <div>
                                <h2 className='font-bold mb-3'>Skills Assessment</h2>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                    <div>
                                        <h2 className='flex justify-between text-sm font-medium'>Technical Skills <span>{feedback?.rating?.technicalSkills ?? 0}/10</span></h2>
                                        <Progress value={(feedback?.rating?.technicalSkills ?? 0) * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between text-sm font-medium'>Communication <span>{feedback?.rating?.communication ?? 0}/10</span></h2>
                                        <Progress value={(feedback?.rating?.communication ?? 0) * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between text-sm font-medium'>Problem Solving <span>{feedback?.rating?.problemSolving ?? 0}/10</span></h2>
                                        <Progress value={(feedback?.rating?.problemSolving ?? 0) * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between text-sm font-medium'>Experience <span>{feedback?.rating?.experience ?? 0}/10</span></h2>
                                        <Progress value={(feedback?.rating?.experience ?? 0) * 10} className='mt-1' />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className='font-bold mb-3'>Performance Summary</h2>
                                <div className='p-4 bg-secondary rounded-md max-h-60 overflow-y-auto'>
                                    {Array.isArray(feedback?.summary) ? (
                                        feedback.summary.map((summary, index) => (
                                            <p key={index} className="mb-2 last:mb-0">{summary}</p>
                                        ))
                                    ) : (
                                        <p>{feedback?.summary || "No summary provided."}</p>
                                    )}
                                </div>
                            </div>

                            <div className={`p-5 rounded-md ${feedback?.Recommendation === false ? 'bg-red-100' : 'bg-green-100'}`}>
                                <h2 className={`font-bold ${feedback?.Recommendation === false ? 'text-red-700' : 'text-green-700'}`}>
                                    Recommendation Msg:
                                </h2>
                                <p className={`${feedback?.Recommendation === false ? 'text-red-500' : 'text-green-500'}`}>
                                    {feedback?.RecommendationMsg}
                                </p>

                                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                                    <Button
                                        onClick={handleSchedule}
                                        className="bg-green-700 hover:bg-green-800 text-white flex-1 sm:flex-none"
                                    >
                                        Schedule Phone Screening Call
                                    </Button>
                                    <Button
                                        onClick={handleReject}
                                        className="bg-red-700 hover:bg-red-800 text-white flex-1 sm:flex-none"
                                    >
                                        Send Rejection Email
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CandidateFeedbackDialog;
