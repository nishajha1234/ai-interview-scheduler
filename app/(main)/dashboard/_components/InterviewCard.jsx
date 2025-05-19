import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, Copy, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview, viewDetail = false }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    toast('Copied')
  }

  const onSend = () => {
    const to = interview?.candidateEmail || ''
    const subject = encodeURIComponent('Interview Link - AiCruiter')

    const body = encodeURIComponent(`
Dear Candidate,

Thank you for your application for the ${interview?.jobPosition || 'position'} role at AiCruiter.

Please find your interview link below. Kindly note that only the first completed interview submission will be considered.

${url}

Should you have any questions, please do not hesitate to reply to this email.

Best regards,
AiCruiter Recruitment Team
    `)

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  }

  return (
    <div className="p-4 sm:p-5 bg-white rounded-xl border">
      <div className="flex items-center justify-between">
        {/* Hide icon on small screens */}
        <div className="hidden sm:flex h-10 w-10 bg-primary rounded-full text-white items-center justify-center">
          <Briefcase className="w-5 h-5" />
        </div>

        <h2 className="text-xs sm:text-sm text-gray-500">
          {moment(interview?.created_at).format('DD MMM YYYY')}
        </h2>
      </div>

      <h2 className="mt-3 font-bold text-lg sm:text-xl">{interview?.jobPosition}</h2>

      <div className="mt-2 text-gray-500 text-sm sm:text-base flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <span>{interview?.duration}</span>
        <span className="text-green-700">
          {interview['interview-feedback']?.length || 0} Candidates
        </span>
      </div>

      {!viewDetail ? (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full mt-5 sm:justify-between justify-center">
          <Button
            variant="outline"
            className="w-full sm:flex-none sm:basis-[48%]"
            onClick={copyLink}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button
            className="w-full sm:flex-none sm:basis-[48%]"
            onClick={onSend}
          >
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>

      ) : (
        <Link href={`/interview-responses/${interview?.interview_id}/details`}>
          <Button className="mt-5 w-full" variant="outline">
            View Detail <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}

export default InterviewCard
