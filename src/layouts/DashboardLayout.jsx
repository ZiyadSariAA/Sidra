import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Sidebar from '../components/dashboard/Sidebar'
import DashboardTopBar from '../components/dashboard/DashboardTopBar'
import DashboardBreadcrumb from '../components/dashboard/DashboardBreadcrumb'
import DashboardContentWrapper from '../components/dashboard/DashboardContentWrapper'

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50" dir="rtl">
      {/* Main Top Bar with Logo and Back to Site */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100/50 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* Right side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse hover:scale-105 transition-all duration-300 group">
              <div className="p-2 rounded-xl bg-[#6D8751] group-hover:shadow-lg transition-all duration-300">
                <Logo className="h-8 text-white" />
              </div>
            </Link>
          </div>

          {/* Left side - Back to Site */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-[#6D8751] bg-[#6D8751]/10 hover:bg-[#6D8751]/20 border border-[#6D8751]/20 hover:border-[#6D8751]/40 rounded-xl transition-all duration-300 hover:scale-105 font-arabic shadow-sm hover:shadow-md"
            >
              العودة للموقع
            </button>
          </div>
        </div>
      </div>

      {/* Two-column grid layout */}
      <div className="grid grid-cols-[260px,1fr] lg:grid-cols-[280px,1fr]">
        {/* Sidebar - Fixed width, sticky, always visible */}
        <Sidebar />

        {/* Main Content - Takes remaining space */}
        <div className="min-h-screen">
          {/* Dashboard Top Bar */}
          <DashboardTopBar />

          {/* Dashboard Breadcrumb */}
          <DashboardBreadcrumb />

          {/* Page Content with Wrapper */}
          <DashboardContentWrapper>
            {children}
          </DashboardContentWrapper>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
