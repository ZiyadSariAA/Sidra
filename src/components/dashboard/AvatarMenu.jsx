import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getRoleDisplayName } from '../../utils/roles'

const AvatarMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  
  const { currentUser, userProfile, logout: authLogout } = useAuth()
  const roleDisplayName = getRoleDisplayName(userProfile?.role)

  // Debug logging
  useEffect(() => {
    console.log('AvatarMenu Debug:', {
      currentUser: !!currentUser,
      userProfile: !!userProfile,
      role: userProfile?.role,
      isOpen
    });
  }, [currentUser, userProfile, isOpen]);

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
    console.log('Logging out...')
    authLogout()
    setIsOpen(false)
    navigate('/')
  }

  const handleDashboardClick = () => {
    console.log('Dashboard clicked, user role:', userProfile?.role)
    setIsOpen(false)
    
    // إذا كان المستخدم قارئ، اذهب إلى صفحة الحساب
    if (userProfile?.role === 'reader') {
      console.log('Navigating to account page')
      navigate('/account')
    } else {
      console.log('Navigating to staff dashboard')
      navigate('/dashboard')
    }
  }

  // If not logged in, don't render anything
  if (!currentUser || !userProfile) {
    console.log('No user or userProfile, not rendering AvatarMenu')
    return null
  }

  // Additional check to ensure userProfile has required data
  if (!userProfile.role) {
    console.log('UserProfile missing role, not rendering AvatarMenu')
    return null
  }

  console.log('AvatarMenu rendering for user:', {
    role: userProfile.role,
    firstName: userProfile.firstName,
    lastName: userProfile.lastName
  });

  const getUserDisplay = () => {
    if (userProfile?.firstName && userProfile?.lastName) {
      return `${userProfile.firstName} ${userProfile.lastName}`;
    }
    if (userProfile?.displayName) {
      return userProfile.displayName;
    }
    if (currentUser?.displayName) {
      return currentUser.displayName;
    }
    if (userProfile?.phoneNumber) {
      return userProfile.phoneNumber;
    }
    if (currentUser?.phoneNumber) {
      return currentUser.phoneNumber;
    }
    return 'مستخدم';
  };

  const getUserInitials = () => {
    const displayName = getUserDisplay();
    if (displayName && displayName !== 'مستخدم') {
      const names = displayName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`;
      }
      return displayName[0];
    }
    return 'م';
  };
  
  return (
    <div className="relative" ref={menuRef}>
      {/* Unified Capsule - No role text inside, consistent across roles */}
      <button
        onClick={() => {
          console.log('Toggle menu clicked, current state:', isOpen)
          console.log('User role:', userProfile?.role)
          setIsOpen(!isOpen)
        }}
        className="flex items-center space-x-3 space-x-reverse text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6D8751] hover:scale-105 transition-transform duration-200"
      >
        <div className="h-8 w-8 rounded-full bg-[#6D8751] flex items-center justify-center">
          <span className="text-white text-sm font-medium font-arabic">
            {getUserInitials()}
          </span>
        </div>
        <div className="text-right">
          <div className="text-gray-700 font-arabic">
            {getUserDisplay()}
          </div>
        </div>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu - RTL with consistent styling and high z-index */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-[9999] border border-gray-100">
          {/* User Info - Top section with name and role */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 font-arabic text-right">
              {getUserDisplay()}
            </p>
            <p className="text-xs text-gray-500 font-arabic text-right">
              {roleDisplayName || 'غير محدد'}
            </p>
          </div>

          {/* Menu Items */}
          {/* Dashboard for all users - readers go to profile, staff go to dashboard */}
          <button
            onClick={handleDashboardClick}
            className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#6D8751] transition-all duration-200 font-arabic border-b border-gray-100"
          >
            لوحة التحكم
          </button>
          
          {/* Sign out always - for all users including readers */}
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
