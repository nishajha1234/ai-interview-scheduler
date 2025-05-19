import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 ">
      <Link
        href="/dashboard/create-interview"
        className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col gap-2 hover:shadow-md transition"
      >
        <Video className="p-3 text-primary bg-blue-50 rounded-lg h-12 w-12" />
        <h2 className="font-bold text-base sm:text-lg">Create New Interview</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Create AI Interviews and schedule them with candidates
        </p>
      </Link>

      <Link
        href="/dashboard/create-phone-screening-call"
        className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col gap-2 hover:shadow-md transition"
      >
        <Phone className="p-3 text-primary bg-blue-50 rounded-lg h-12 w-12" />
        <h2 className="font-bold text-base sm:text-lg">Create Phone Screening Call</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Schedule phone screening call with candidates
        </p>
      </Link>
    </div>
  )
}

export default CreateOptions
