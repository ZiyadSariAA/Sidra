import React from 'react'
import { useLocation } from 'react-router-dom'

const DashboardContentWrapper = ({ children, customTitle = null }) => {
  const location = useLocation()

  // Get page title based on current route if no custom title provided
  const getPageTitle = () => {
    if (customTitle) return customTitle
    
    const path = location.pathname
    
    if (path === '/dashboard') {
      return 'لوحة التحكم'
    } else if (path === '/dashboard/write') {
      return 'كتابة مقال جديد'
    } else if (path === '/dashboard/my-articles') {
      return 'مقالاتي'
    } else if (path === '/dashboard/profile') {
      return 'الملف الشخصي'
    } else if (path === '/dashboard/editor') {
      return 'مراجعة المقالات'
    } else if (path === '/dashboard/chief') {
      return 'لوحة رئيس التحرير'
    } else if (path.includes('/dashboard/edit-article/')) {
      return 'تعديل المقال'
    } else if (path.includes('/dashboard/view-article/')) {
      return 'عرض المقال'
    }
    
    return 'لوحة التحكم'
  }

  // Get page description based on current route
  const getPageDescription = () => {
    const path = location.pathname
    
    if (path === '/dashboard') {
      return 'مرحباً بك في لوحة التحكم - إدارة المحتوى والتحرير'
    } else if (path === '/dashboard/write') {
      return 'اكتب مقالك وأرسله للمراجعة'
    } else if (path === '/dashboard/my-articles') {
      return 'إدارة مقالاتك المنشورة والمسودات'
    } else if (path === '/dashboard/profile') {
      return 'تحديث معلوماتك الشخصية'
    } else if (path === '/dashboard/editor') {
      return 'مراجعة وتحرير المقالات المقدمة'
    } else if (path === '/dashboard/chief') {
      return 'إدارة فريق التحرير والموافقة على المقالات'
    } else if (path.includes('/dashboard/edit-article/')) {
      return 'تعديل محتوى المقال'
    } else if (path.includes('/dashboard/view-article/')) {
      return 'عرض تفاصيل المقال'
    }
    
    return 'إدارة المحتوى والتحرير'
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100/50 mb-6">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              {/* Page Title Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#6D8751] flex items-center justify-center text-white text-xl font-bold shadow-lg mx-auto sm:mx-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {/* Background circle */}
                  <circle cx="12" cy="12" r="11" fill="currentColor"/>
                  
                  {/* Letter "س" in white */}
                  <path d="M8 8h8v1.5H8V8z" fill="white"/>
                  <path d="M7 10.5h10v1H7V10.5z" fill="white"/>
                  <path d="M8 13h8v1.5H8V13z" fill="white"/>
                  <path d="M7 15.5h10v1H7V15.5z" fill="white"/>
                  
                  {/* Decorative dots representing the three dots of "س" */}
                  <circle cx="10" cy="11.25" r="1" fill="white"/>
                  <circle cx="12" cy="11.25" r="1" fill="white"/>
                  <circle cx="14" cy="11.25" r="1" fill="white"/>
                </svg>
              </div>
              
              {/* Page Title and Description */}
              <div className="flex-1 text-center sm:text-right">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-arabic mb-2">
                  {getPageTitle()}
                </h1>
                <p className="text-gray-600 font-arabic text-sm sm:text-base">
                  {getPageDescription()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardContentWrapper
