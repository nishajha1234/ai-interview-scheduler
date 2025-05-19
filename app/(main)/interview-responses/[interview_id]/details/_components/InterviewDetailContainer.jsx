import { Calendar, Clock } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className="p-4 sm:p-5 bg-white rounded-lg mt-5 w-full max-w-full">
      <h2 className="text-xl font-semibold">{interviewDetail?.jobPosition}</h2>

      <div className="mt-4 flex flex-wrap gap-6 justify-between lg:pr-52">
        <div className="min-w-[120px]">
          <h2 className="text-sm text-gray-500">Duration</h2>
          <h2 className="flex text-sm font-bold items-center gap-2 text-primary">
            <Clock className="h-4 w-4" />
            {interviewDetail?.duration}
          </h2>
        </div>
        <div className="min-w-[120px]">
          <h2 className="text-sm text-gray-500">Created On</h2>
          <h2 className="flex text-sm font-bold items-center gap-2 text-primary">
            <Calendar className="h-4 w-4" />
            {moment(interviewDetail?.created_at).format('MMM DD, yyyy')}
          </h2>
        </div>
        {interviewDetail?.type && (
          <div className="min-w-[120px]">
            <h2 className="text-sm text-gray-500">Type</h2>
            <h2 className="flex text-sm font-bold items-center gap-2 text-blue-500">
              <Clock className="h-4 w-4" />
              {JSON.parse(interviewDetail?.type)[0]}
            </h2>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h2 className="font-bold text-lg mb-2">Job Description</h2>
        <p className="text-xs sm:text-sm text-justify leading-4 sm:leading-6">{interviewDetail?.jobDescription}</p>
      </div>

      <div className="mt-5">
        <h2 className="font-bold text-lg mb-3">Interview Questions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {interviewDetail?.questionList.map((item, index) => (
            <h2 key={index} className="text-xs">
              {index + 1}. {item?.question}
            </h2>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InterviewDetailContainer

