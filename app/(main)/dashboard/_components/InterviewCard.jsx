import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, Copy, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({interview, viewDetail=false}) {
    const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id

    const copyLink=()=>{
        navigator.clipboard.writeText(url);
        toast('Copied')
            }

const onSend = () => {
  const to = interview?.candidateEmail || "";
  const subject = encodeURIComponent("Interview Link - AiCruiter");

  const body = encodeURIComponent(`
Dear Candidate,

Thank you for your application for the ${interview?.jobPosition || "position"} role at AiCruiter.

Please find your interview link below. Kindly note that only the first completed interview submission will be considered.

${url}

Should you have any questions, please do not hesitate to reply to this email.

Best regards,
AiCruiter Recruitment Team
  `);

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
};



  return (
    <div className='p-5 bg-white rounded-lg border'> 
        <div className='flex items-center justify-between'>
            <div className='h-[40px] w-[40px] bg-primary rounded-full text-white flex items-center justify-center'><Briefcase className='white'/></div>
                <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
        </div>
        <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
        <h2 className='mt-2 flex justify-between text-gray-500'>{interview?.duration }
            <span className='text-green-700'>{interview['interview-feedback']?.length || 0} Candidates</span>
        </h2>
        {!viewDetail? <div className='flex gap-3 w-full mt-5'>
            <Button variant='outline' className={'flex-1 cursor-pointer'} onClick={copyLink}><Copy/> Copy Link</Button>
            <Button className={'flex-1 cursor-pointer'} onClick={onSend}><Send/>  Send</Button>
        </div>
        :
        <Link href={'/interview-responses/'+interview?.interview_id+"/details"}><Button className="mt-5 w-full cursor-pointer" variant="outline">View Detail <ArrowRight/></Button></Link>
        }
    </div>
  )
}

export default InterviewCard