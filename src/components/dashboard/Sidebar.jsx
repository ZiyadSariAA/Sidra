import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { roleMenus } from '../../config/roleMenus'
import {
  LayoutDashboard, PencilLine, FileText, Inbox, Users, Settings, User as UserIcon
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const { userProfile } = useAuth()

  // Icon mapping for menu items - using the actual keys from roleMenus
  const iconMap = {
    'overview': LayoutDashboard,
    'write': PencilLine,
    'my-articles': FileText,
    'editor': Inbox,
    'chief': Users,
    'admin': Settings,
    'profile': UserIcon,
  }

  // Get menu items based on user role
  const getMenuItems = () => {
    const role = userProfile?.role
    return roleMenus[role] || roleMenus.writer
  }

  const menuItems = getMenuItems()
  const currentPath = location.pathname

  return (
    <div className="sticky top-0 h-screen overflow-y-auto bg-white z-40 border-r border-gray-200">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 rounded-xl bg-[#6D8751] flex items-center justify-center text-white text-lg font-bold shadow-lg">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* Main circle representing the platform */}
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              {/* Digital media elements */}
              {/* Document/Article icon */}
              <path d="M8 6h8v2H8V6z" fill="currentColor"/>
              <path d="M8 9h6v1H8V9z" fill="currentColor"/>
              <path d="M8 11h8v1H8V11z" fill="currentColor"/>
              <path d="M8 13h8v1H8V13z" fill="currentColor"/>
              <path d="M8 15h8v1H8V15z" fill="currentColor"/>
              {/* Media play button */}
              <circle cx="16" cy="8" r="2" fill="currentColor"/>
              <path d="M15 7l2 1.5L15 10V7z" fill="white"/>
              {/* Connection lines representing digital network */}
              <path d="M6 8l2-2M6 16l2 2M18 8l-2-2M18 16l-2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-arabic">لوحة التحكم</h2>
            <p className="text-sm text-gray-500 font-arabic">إدارة المحتوى</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path
            const IconComponent = iconMap[item.key]
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 space-x-reverse px-4 py-3.5 rounded-xl transition-all duration-200 font-arabic group ${
                    isActive
                      ? 'bg-[#6D8751] text-white shadow-md'
                      : 'text-gray-700 hover:bg-[#6D8751]/10 hover:text-[#6D8751]'
                  }`}
                >
                  <span className="flex-shrink-0">
                    {IconComponent ? (
                      <IconComponent className="w-5 h-5" aria-hidden />
                    ) : (
                      <LayoutDashboard className="w-5 h-5" aria-hidden />
                    )}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-auto"></div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl bg-gray-50">
          <div className="w-8 h-8 rounded-lg bg-[#6D8751] flex items-center justify-center text-white text-sm font-bold">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* Main circle representing the platform */}
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              {/* Digital media elements */}
              {/* Document/Article icon */}
              <path d="M8 6h8v2H8V6z" fill="currentColor"/>
              <path d="M8 9h6v1H8V9z" fill="currentColor"/>
              <path d="M8 11h8v1H8V11z" fill="currentColor"/>
              <path d="M8 13h8v1H8V13z" fill="currentColor"/>
              <path d="M8 15h8v1H8V15z" fill="currentColor"/>
              {/* Media play button */}
              <circle cx="16" cy="8" r="2" fill="currentColor"/>
              <path d="M15 7l2 1.5L15 10V7z" fill="white"/>
              {/* Connection lines representing digital network */}
              <path d="M6 8l2-2M6 16l2 2M18 8l-2-2M18 16l-2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 font-arabic">سِدره</p>
            <p className="text-xs text-gray-500 font-arabic">منصة إعلامية</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
