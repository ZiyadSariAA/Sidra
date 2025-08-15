import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import AvatarMenu from './AvatarMenu'

const DashboardTopBar = () => {
  const location = useLocation()
  const { userProfile } = useAuth()

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/dashboard/write') return 'كتابة مقال جديد'
    if (path === '/dashboard/my-articles') return 'مقالاتي'
    if (path === '/dashboard/profile') return 'الملف الشخصي'
    if (path === '/dashboard/editor') return 'مراجعة المقالات'
    if (path === '/dashboard/chief') return 'لوحة رئيس التحرير'
    if (path.includes('/dashboard/edit-article/')) return 'تعديل المقال'
    if (path.includes('/dashboard/view-article/')) return 'عرض المقال'
    return 'لوحة التحكم'
  }

  const getUserDisplay = () => {
    return userProfile?.displayName || userProfile?.email || 'مستخدم'
  }

  const getRoleDisplay = (role) => {
    const roleNames = {
      'writer': 'كاتب',
      'editor': 'محرر',
      'editor-in-chief': 'رئيس التحرير',
      'admin': 'مدير',
      'owner': 'مالك'
    }
    return roleNames[role] || 'مستخدم'
  }

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-gray-100/60 shadow-sm sticky top-16 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-1 h-6 sm:h-8 bg-[#6D8751] rounded-full ml-2 sm:ml-3"></div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 font-arabic">
            {getPageTitle()}
          </h1>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-medium text-gray-900 font-arabic">
              {getUserDisplay()}
            </p>
            <p className="text-xs text-gray-500 font-arabic">
              {getRoleDisplay(userProfile?.role)}
            </p>
          </div>
          <AvatarMenu />
        </div>
      </div>
    </div>
  )
}

export default DashboardTopBar
