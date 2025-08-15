import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const DashboardBreadcrumb = () => {
  const location = useLocation()

  const getBreadcrumbItems = () => {
    const path = location.pathname
    const items = [
      { label: 'لوحة التحكم', path: '/dashboard', icon: '🏠' }
    ]

    if (path === '/dashboard/write') {
      items.push({ label: 'كتابة مقال جديد', path: '/dashboard/write', icon: '✍️' })
    } else if (path === '/dashboard/my-articles') {
      items.push({ label: 'مقالاتي', path: '/dashboard/my-articles', icon: '📝' })
    } else if (path === '/dashboard/profile') {
      items.push({ label: 'الملف الشخصي', path: '/dashboard/profile', icon: '👤' })
    } else if (path === '/dashboard/editor') {
      items.push({ label: 'مراجعة المقالات', path: '/dashboard/editor', icon: '📋' })
    } else if (path === '/dashboard/chief') {
      items.push({ label: 'لوحة رئيس التحرير', path: '/dashboard/chief', icon: '🎯' })
    } else if (path.includes('/dashboard/edit-article/')) {
      items.push(
        { label: 'مقالاتي', path: '/dashboard/my-articles', icon: '📝' },
        { label: 'تعديل المقال', path: path, icon: '✏️' }
      )
    } else if (path.includes('/dashboard/view-article/')) {
      items.push(
        { label: 'مقالاتي', path: '/dashboard/my-articles', icon: '📝' },
        { label: 'عرض المقال', path: path, icon: '👁️' }
      )
    }

    return items
  }

  const breadcrumbItems = getBreadcrumbItems()

  return (
    <nav className="bg-white/60 backdrop-blur-sm border-b border-gray-100/40 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 space-x-reverse text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-900 font-medium font-arabic flex items-center">
                  <span className="ml-2">{item.icon}</span>
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-gray-600 hover:text-[#6D8751] transition-colors duration-200 font-arabic flex items-center hover:scale-105"
                >
                  <span className="ml-2">{item.icon}</span>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export default DashboardBreadcrumb
