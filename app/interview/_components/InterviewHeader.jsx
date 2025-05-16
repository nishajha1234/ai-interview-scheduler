import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='flex justify-between items-center px-6 shadow-md sticky top-0 bg-white z-50 '>
      <Image src={'/logo.png'} alt='logo' width={200} height={50} className='w-[140px]'/>
    </div>
  )
}

export default InterviewHeader