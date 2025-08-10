import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import SearchIcon from '/assets/search.svg'
import MenuIcon from '/assets/menu.svg'
import AvatarMenu from './dashboard/AvatarMenu'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Search */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/">
              <Logo className="h-8" />
            </Link>
            <button className="text-gray-600 hover:text-[#6D8751] transition-colors p-2 rounded-lg hover:bg-gray-50 hover:scale-110 transition-transform duration-200">
              <img src={SearchIcon} alt="بحث" className="w-5 h-5" />
            </button>
          </div>
          
          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg font-medium font-arabic hover:scale-105 transition-transform duration-200 ${
                isActive('/') 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-[#6D8751] hover:bg-gray-50'
              }`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/articles" 
              className={`px-3 py-2 rounded-lg font-medium font-arabic hover:scale-105 transition-transform duration-200 ${
                isActive('/articles') 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-[#6D8751] hover:bg-gray-50'
              }`}
            >
              مقالات
            </Link>
            <Link 
              to="/series" 
              className={`px-3 py-2 rounded-lg font-medium font-arabic hover:scale-105 transition-transform duration-200 ${
                isActive('/series') 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-[#6D8751] hover:bg-gray-50'
              }`}
            >
              سلسلة
            </Link>
            <Link 
              to="/episodes" 
              className={`px-3 py-2 rounded-lg font-medium font-arabic hover:scale-105 transition-transform duration-200 ${
                isActive('/episodes') 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-[#6D8751] hover:bg-gray-50'
              }`}
            >
              الإذاعة
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-lg font-medium font-arabic hover:scale-105 transition-transform duration-200 ${
                isActive('/about') 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-[#6D8751] hover:bg-gray-50'
              }`}
            >
              عن سِدره
            </Link>
            <Link 
              to="/join" 
              className={`px-3 py-2 rounded-lg font-medium font-arabic hover:scale-105 transition-transform duration-200 ${
                isActive('/join') 
                  ? 'text-gray-900 bg-gray-100' 
                  : 'text-gray-600 hover:text-[#6D8751] hover:bg-gray-50'
              }`}
            >
              انضم لنا
            </Link>
          </div>
          
          {/* Right side - Avatar Menu and Mobile Menu */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <AvatarMenu />
            <button className="md:hidden text-gray-600 hover:text-[#6D8751] transition-colors p-2 rounded-lg hover:bg-gray-50 hover:scale-110 transition-transform duration-200">
              <img src={MenuIcon} alt="القائمة" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header 