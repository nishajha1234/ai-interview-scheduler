import React from 'react'
import DashboardProvider from './dashboard/provider'

function DashboardLayout({ children }) {
  return (
    <div>
      <DashboardProvider>
        <div className='p-10 max-sm:p-2'>
          {children}
        </div>
      </DashboardProvider>
    </div>
  )
}

export default DashboardLayout
