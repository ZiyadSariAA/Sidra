import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { roleMenus } from '../../config/roleMenus'
import { getUserRole } from '../../utils/roles'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const userRole = getUserRole()
  
  // Get menu items for current role, fallback to default
  const menuItems = roleMenus[userRole] || roleMenus.default

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 right-0 z-50 w-72 bg-white/90 backdrop-blur-sm shadow-xl border-l border-gray-100/50 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100/50 bg-gradient-to-r from-[#6D8751]/5 to-[#5a6f42]/5">
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#6D8751] to-[#5a6f42] bg-clip-text text-transparent font-arabic">
              لوحة التحكم
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl text-[#6D8751] bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 hover:scale-110 transition-all duration-300"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`flex items-center space-x-4 space-x-reverse px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 font-arabic hover:scale-105 group ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#6D8751] to-[#5a6f42] text-white shadow-lg shadow-[#6D8751]/25'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-[#6D8751]/10 hover:to-[#5a6f42]/10 hover:text-[#6D8751] hover:shadow-sm'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={`text-xl transition-all duration-300 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span className="font-semibold">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100/50 bg-gradient-to-r from-[#6D8751]/5 to-[#5a6f42]/5">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-lg font-bold">
                س
              </div>
              <p className="text-xs text-gray-500 font-arabic">منصة سِدره الرقمية</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600/75 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
