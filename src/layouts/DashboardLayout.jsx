import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Sidebar from '../components/dashboard/Sidebar'
import AvatarMenu from '../components/dashboard/AvatarMenu'

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50" dir="rtl">
      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100/50 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Right side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse hover:scale-105 transition-all duration-300 group">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] group-hover:shadow-lg transition-all duration-300">
                <Logo className="h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#6D8751] to-[#5a6f42] bg-clip-text text-transparent font-arabic">
                سِدره
              </span>
            </Link>
          </div>

          {/* Left side - Avatar and Back to Site */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 text-sm font-medium text-[#6D8751] bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 border border-[#6D8751]/20 hover:border-[#6D8751]/40 rounded-xl transition-all duration-300 hover:scale-105 font-arabic shadow-sm hover:shadow-md"
            >
              العودة للموقع
            </button>
            
            {/* Avatar Menu */}
            <AvatarMenu />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 lg:mr-0">
          {/* Mobile menu button */}
          <div className="lg:hidden p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-3 rounded-xl text-[#6D8751] bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 hover:scale-110 transition-all duration-300 shadow-sm"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Page Content */}
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
