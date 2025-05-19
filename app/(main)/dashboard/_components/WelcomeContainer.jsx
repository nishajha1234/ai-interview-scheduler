'use client'

import { useUser } from '@/app/provider'
import Image from 'next/image'
import React from 'react'

function WelcomeContainer() {
  const { user } = useUser()

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 m-4 mb-0">
      <div>
        <h2 className="text-base sm:text-lg font-bold">
          Welcome Back, {user?.name}
        </h2>
        <h2 className="text-gray-500 text-sm sm:text-base">
          Automated Interviews, Seamless Hiring
        </h2>
      </div>

      {user && (
        <Image
          src={user?.picture}
          alt="userAvatar"
          width={40}
          height={40}
          className="rounded-full object-cover self-start sm:self-auto"
        />
      )}
    </div>
  )
}

export default WelcomeContainer