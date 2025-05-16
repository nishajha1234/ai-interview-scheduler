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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription asChild>
                        <div className='mt-5'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-5'>
                                    <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>{candidate.userName[0]}</h2>
                                    <div>
                                        <h2 className='font-bold'>{candidate?.userName}</h2>
                                        <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                                    </div>
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <h2 className='text-primary text-2xl font-bold'><span>{feedback?.rating?.overallRating}/10</span></h2>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <h2 className='font-bold'>Skills Assesment</h2>
                                <div className='mt-3 grid grid-cols-2 gap-10'>
                                    <div>
                                        <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills}/10</span></h2>
                                        <Progress value={feedback?.rating?.technicalSkills * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Communication <span>{feedback?.rating?.communication}/10</span></h2>
                                        <Progress value={feedback?.rating?.communication * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Problem Solving <span>{feedback?.rating?.problemSolving}/10</span></h2>
                                        <Progress value={feedback?.rating?.problemSolving * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Experience <span>{feedback?.rating?.experience}/10</span></h2>
                                        <Progress value={feedback?.rating?.experience * 10} className='mt-1' />
                                    </div>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <h2 className='font-bold'>Performance Summary</h2>
                                <div className='p-5 bg-secondary my-3 rounded-md'>
                                    {Array.isArray(feedback?.summary) ? (
                                        feedback.summary.map((summary, index) => (
                                            <p key={index}>{summary}</p>
                                        ))
                                    ) : (
                                        <p>{feedback?.summary || "No summary provided."}</p>
                                    )}
                                </div>
                            </div>

                          <div className={`p-5 mt-10 rounded-md ${feedback?.Recommendation === false ? 'bg-red-100' : 'bg-green-100'}`}>
  <div>
    <h2 className={`font-bold ${feedback?.Recommendation === false ? 'text-red-700' : 'text-green-700'}`}>Recommendation Msg:</h2>
    <p className={`${feedback?.Recommendation === false ? 'text-red-500' : 'text-green-500'}`}>
      {feedback?.RecommendationMsg}
    </p>
  </div>

  {/* Buttons BELOW the message */}
  <div className="mt-3 flex gap-4 flex-wrap">
    <Button
      onClick={handleSchedule}
      className="bg-green-700 hover:bg-green-800 text-white"
    >
      Schedule Phone Screening Call
    </Button>
    <Button
      onClick={handleReject}
      className="bg-red-700 hover:bg-red-800 text-white"
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

export default CandidateFeedbackDialog