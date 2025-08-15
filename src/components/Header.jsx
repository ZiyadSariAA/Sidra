import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../services/firebaseAuth';
import Logo from './Logo';
import AuthModal from './auth/AuthModal';
import AvatarMenu from './dashboard/AvatarMenu';

const Header = () => {
  const { currentUser, userProfile, isAuthenticated, loading, isInitialized } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

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

  const getUserRole = () => {
    if (userProfile?.role) {
      const roleNames = {
        'reader': 'قارئ',
        'writer': 'كاتب',
        'editor': 'محرر',
        'editor-in-chief': 'رئيس تحرير',
        'admin': 'مدير'
      };
      return roleNames[userProfile.role] || userProfile.role;
    }
    return 'جاري التحميل...';
  };

  const getUserInitials = () => {
    const displayName = getUserDisplay();
    if (displayName && displayName !== 'مستخدم' && displayName !== 'جاري التحميل...') {
      const names = displayName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`;
      }
      return displayName[0];
    }
    return 'م';
  };

  // عرض loading state حتى تستقر حالة المصادقة
  const shouldShowLoading = loading || !isInitialized;
  const canShowAuthState = !shouldShowLoading;

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse hover:scale-105 transition-all duration-300 group">
              <div className="p-2 rounded-xl bg-[#6D8751] group-hover:shadow-lg transition-all duration-300">
                <Logo className="h-8 text-white" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-[#6D8751] px-3 py-2 rounded-md text-sm font-medium transition-colors">
              الرئيسية
            </Link>
            <Link to="/articles" className="text-gray-700 hover:text-[#6D8751] px-3 py-2 rounded-md text-sm font-medium transition-colors">
              المقالات
            </Link>
            <Link to="/series" className="text-gray-700 hover:text-[#6D8751] px-3 py-2 rounded-md text-sm font-medium transition-colors">
              السلسلات
            </Link>
            <Link to="/episodes" className="text-gray-700 hover:text-[#6D8751] px-3 py-2 rounded-md text-sm font-medium transition-colors">
              الإذاعة
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#6D8751] px-3 py-2 rounded-md text-sm font-medium transition-colors">
              من نحن
            </Link>
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {shouldShowLoading ? (
              // Loading state
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#6D8751]"></div>
                <span className="text-sm text-gray-500">جاري التحميل...</span>
              </div>
            ) : canShowAuthState ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                {isAuthenticated && userProfile ? (
                  <AvatarMenu />
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#6D8751] hover:bg-[#5a6f42] rounded-lg transition-all duration-200 hover:scale-105 font-arabic"
                  >
                    تسجيل الدخول
                  </button>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-[#6D8751] p-2 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="text-gray-700 hover:text-[#6D8751] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-[#6D8751] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                من نحن
              </Link>
              <Link
                to="/series"
                className="text-gray-700 hover:text-[#6D8751] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                المسلسلات
              </Link>
              <Link
                to="/episodes"
                className="text-gray-700 hover:text-[#6D8751] block px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الحلقات
              </Link>
              <Link
                to="/articles"
                className="text-gray-700 hover:text-[#6D8751] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                المقالات
              </Link>
              <Link
                to="/join"
                className="text-gray-700 hover:text-[#6D8751] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                انضم إلينا
              </Link>

              {/* Mobile Auth */}
              {isAuthenticated && userProfile ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="px-3 py-2 text-sm text-gray-700">
                    <span className="font-medium">{getUserDisplay()}</span>
                    <span className="text-gray-500 mr-2">({getUserRole()})</span>
                  </div>
                  {/* لوحة التحكم فقط للمستخدمين غير القراء */}
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
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-right px-3 py-2 text-base font-medium bg-[#6D8751] text-white rounded-md hover:bg-[#5a6f42] transition-colors"
                  >
                    الدخول
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header; 