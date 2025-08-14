import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../services/firebaseAuth';
import Logo from './Logo';

const Header = () => {
  const { currentUser, userProfile, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getUserDisplay = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName;
    }
    if (userProfile?.phoneNumber) {
      return userProfile.phoneNumber;
    }
    if (currentUser?.phoneNumber) {
      return currentUser.phoneNumber;
    }
    return 'مستخدم';
  };

  const getUserRole = () => {
    console.log('Header - userProfile:', userProfile);
    console.log('Header - userProfile.role:', userProfile?.role);
    
    if (userProfile?.role) {
      return userProfile.role;
    }
    
    // إذا لم يتم تحميل userProfile بعد، استخدم القيمة الافتراضية
    return 'جاري التحميل...';
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              الرئيسية
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              من نحن
            </Link>
            <Link to="/series" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              المسلسلات
            </Link>
            <Link to="/episodes" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              الحلقات
            </Link>
            <Link to="/articles" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              المقالات
            </Link>
            <Link to="/join" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              انضم إلينا
            </Link>
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{getUserDisplay()}</span>
                  <span className="text-gray-500 mr-2">({getUserRole()})</span>
                </div>
                {userProfile?.role !== 'reader' && (
                  <Link
                    to="/dashboard"
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    لوحة التحكم
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 p-2 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                من نحن
              </Link>
              <Link
                to="/series"
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                المسلسلات
              </Link>
              <Link
                to="/episodes"
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الحلقات
              </Link>
              <Link
                to="/articles"
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                المقالات
              </Link>
              <Link
                to="/join"
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                انضم إلينا
              </Link>

              {/* Mobile Auth */}
              {isAuthenticated ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="px-3 py-2 text-sm text-gray-700">
                    <span className="font-medium">{getUserDisplay()}</span>
                    <span className="text-gray-500 mr-2">({getUserRole()})</span>
                  </div>
                  {userProfile?.role !== 'reader' && (
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      لوحة التحكم
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-right px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <div className="pt-4 pb-3 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-base font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    إنشاء حساب
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 