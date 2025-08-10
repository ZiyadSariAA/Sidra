import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../../utils/auth'
import { getUserRole, getRoleDisplayName } from '../../utils/roles'

const AvatarMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  
  const currentUser = getCurrentUser()
  const userRole = getUserRole()
  const roleDisplayName = getRoleDisplayName(userRole)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  const handleDashboardClick = () => {
    setIsOpen(false)
    navigate('/dashboard/overview')
  }

  // If not logged in, show login button
  if (!currentUser) {
    return (
      <button
        onClick={() => setShowLoginModal(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-[#6D8751] hover:bg-[#5a6f42] rounded-lg transition-all duration-200 hover:scale-105 font-arabic"
      >
        تسجيل الدخول
      </button>
    )
  }

  // If logged in, show avatar with dropdown
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 space-x-reverse text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6D8751] hover:scale-105 transition-transform duration-200"
      >
        <div className="h-8 w-8 rounded-full bg-[#6D8751] flex items-center justify-center">
          <span className="text-white text-sm font-medium font-arabic">
            {currentUser.name ? currentUser.name.charAt(0) : 'م'}
          </span>
        </div>
        <span className="text-gray-700 font-arabic">{currentUser.name || 'المستخدم'}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
          {/* User Info */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 font-arabic">{currentUser.name || 'المستخدم'}</p>
            <p className="text-xs text-gray-500 font-arabic">{roleDisplayName}</p>
          </div>

          {/* Menu Items */}
          <button
            onClick={handleDashboardClick}
            className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#6D8751] transition-all duration-200 font-arabic"
          >
            لوحة التحكم
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#6D8751] transition-all duration-200 font-arabic"
          >
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  )
}

export default AvatarMenu
