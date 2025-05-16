import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

function DashboardProvider({children}) {
  return (
    <SidebarProvider className='bg-[#f3f4f6]'>
        <AppSidebar></AppSidebar>
    <div className='w-full p-10'>
      <SidebarTrigger/>
      <div className='mx-9'>
      <WelcomeContainer />
      </div>
      {children}
      </div>
    </SidebarProvider>
  )
}

export default DashboardProvider