import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from '../_components/AppSidebar'
import WelcomeContainer from './_components/WelcomeContainer'

function DashboardProvider({ children }) {
  return (
    <SidebarProvider className="bg-[#f3f4f6]">
      <AppSidebar />
      <div className="w-full px-4 sm:px-4 md:px-6 lg:px-10 py-4">
        <SidebarTrigger />
        <div className="mx-0 sm:mx-2 md:mx-4 lg:mx-6">
          <WelcomeContainer />
        </div>
        {children}
      </div>
    </SidebarProvider>
  )
}

export default DashboardProvider
