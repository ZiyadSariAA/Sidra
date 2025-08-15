import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getRoleDisplayName } from '../../utils/roles';

const RoleBasedDashboard = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
    }
  };

  const getRoleDisplay = (role) => {
    return getRoleDisplayName(role);
  };

  const getRoleDescription = (role) => {
    const descriptions = {
      'writer': 'يمكنك كتابة المقالات وإدارتها، وإضافة محتوى جديد لمنصة سِدره',
      'editor': 'يمكنك مراجعة وتحرير المقالات، وضمان جودة المحتوى المنشور',
      'editor-in-chief': 'يمكنك الموافقة النهائية على المقالات، وإدارة فريق التحرير',
      'reader': 'يمكنك قراءة المقالات المعتمدة والاستماع للحلقات الصوتية'
    };
    return descriptions[role] || 'دور غير محدد';
  };

  // Get role icon
  const getRoleIcon = (role) => {
    const roleIcons = {
      'writer': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      'editor': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      'editor-in-chief': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      'admin': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      'owner': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
    return roleIcons[role] || roleIcons['writer']
  }

  // Get dashboard actions based on role
  const getDashboardActions = (role) => {
    const actions = {
      'writer': [
        {
          label: 'كتابة مقال جديد',
          description: 'ابدأ بكتابة مقالك',
          path: '/dashboard/write',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          )
        },
        {
          label: 'مقالاتي',
          description: 'إدارة مقالاتي',
          path: '/dashboard/my-articles',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        },
        {
          label: 'الملف الشخصي',
          description: 'تحديث معلوماتي',
          path: '/dashboard/profile',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        }
      ],
      'editor': [
        {
          label: 'مراجعة المقالات',
          description: 'مراجعة المقالات المقدمة',
          path: '/dashboard/editor',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        },
        {
          label: 'مقالاتي',
          description: 'إدارة مقالاتي',
          path: '/dashboard/my-articles',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        },
        {
          label: 'الملف الشخصي',
          description: 'تحديث معلوماتي',
          path: '/dashboard/profile',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        }
      ],
      'editor-in-chief': [
        {
          label: 'لوحة رئيس التحرير',
          description: 'إدارة فريق التحرير',
          path: '/dashboard/chief',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )
        },
        {
          label: 'مراجعة المقالات',
          description: 'مراجعة المقالات المقدمة',
          path: '/dashboard/editor',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        },
        {
          label: 'الملف الشخصي',
          description: 'تحديث معلوماتي',
          path: '/dashboard/profile',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        }
      ],
      'admin': [
        {
          label: 'إدارة النظام',
          description: 'إدارة النظام والمستخدمين',
          path: '/dashboard/admin',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        },
        {
          label: 'لوحة رئيس التحرير',
          description: 'إدارة فريق التحرير',
          path: '/dashboard/chief',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )
        },
        {
          label: 'الملف الشخصي',
          description: 'تحديث معلوماتي',
          path: '/dashboard/profile',
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        }
      ]
    }
    return actions[role] || actions['writer']
  }

  const getQuickStats = (role) => {
    const stats = {
      'writer': [
        { label: 'مقالاتي', value: '12', icon: '📝', color: 'from-blue-500 to-blue-600' },
        { label: 'المشاهدات', value: '2.4K', icon: '👁️', color: 'from-green-500 to-green-600' },
        { label: 'التعليقات', value: '45', icon: '💬', color: 'from-purple-500 to-purple-600' }
      ],
      'editor': [
        { label: 'مقالات مراجعة', value: '28', icon: '📋', color: 'from-indigo-500 to-indigo-600' },
        { label: 'مقالاتي', value: '15', icon: '📝', color: 'from-blue-500 to-blue-600' },
        { label: 'المشاهدات', value: '5.2K', icon: '👁️', color: 'from-green-500 to-green-600' }
      ],
      'editor-in-chief': [
        { label: 'فريق التحرير', value: '8', icon: '👥', color: 'from-red-500 to-red-600' },
        { label: 'مقالات معتمدة', value: '156', icon: '✅', color: 'from-green-500 to-green-600' },
        { label: 'إجمالي المحتوى', value: '89', icon: '📊', color: 'from-blue-500 to-blue-600' }
      ]
    };
    return stats[role] || stats['writer'];
  };

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6D8751] mx-auto mb-4"></div>
          <p className="text-gray-600 font-arabic">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const userRole = userProfile?.role || 'writer';
  
  console.log('RoleBasedDashboard - currentUser:', currentUser);
  console.log('RoleBasedDashboard - userProfile:', userProfile);
  console.log('RoleBasedDashboard - userRole:', userRole);

  return (
    <div className="space-y-8" dir="rtl">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[#6D8751] flex items-center justify-center text-white text-4xl shadow-lg shadow-[#6D8751]/25">
            {getRoleIcon(userRole)}
          </div>
          <h2 className="text-3xl font-bold text-[#6D8751] mb-3 font-arabic">
            مرحباً بك في لوحة التحكم
          </h2>
          <p className="text-gray-600 text-lg font-arabic mb-4">
            {userProfile?.firstName && userProfile?.lastName 
              ? `${userProfile.firstName} ${userProfile.lastName}`
              : userProfile?.displayName || currentUser.displayName || currentUser.email
            }
          </p>
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#6D8751]/10 border border-[#6D8751]/20 text-[#6D8751] font-arabic">
            {getRoleDisplay(userRole)}
          </div>
          <p className="text-gray-500 mt-3 font-arabic max-w-2xl mx-auto">
            {getRoleDescription(userRole)}
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getQuickStats(userRole).map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-arabic mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-4 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 font-arabic flex items-center">
          <span className="w-2 h-6 sm:h-8 bg-[#6D8751] rounded-full ml-3"></span>
          الإجراءات السريعة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {getDashboardActions(userRole).map((action, index) => (
            <div
              key={index}
              className={`bg-[#6D8751] text-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-white/20`}
              onClick={() => navigate(action.path)}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{action.icon}</div>
                <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 font-arabic">{action.label}</div>
                <div className="text-xs sm:text-sm opacity-90 font-arabic">{action.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-4 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 font-arabic flex items-center">
          <span className="w-2 h-6 sm:h-8 bg-[#6D8751] rounded-full ml-3"></span>
          النشاط الأخير
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center p-3 sm:p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#6D8751] flex items-center justify-center text-white text-xs sm:text-sm font-bold ml-3 sm:ml-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium text-gray-900 font-arabic">تم تسجيل دخولك بنجاح إلى لوحة التحكم</p>
              <p className="text-xs sm:text-sm text-gray-500 font-arabic">الآن</p>
            </div>
          </div>
          <div className="flex items-center p-3 sm:p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#6D8751] flex items-center justify-center text-white text-xs sm:text-sm font-bold ml-3 sm:ml-4">
              {getRoleIcon(userRole)}
            </div>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium text-gray-900 font-arabic">تم تحديث دورك إلى: {getRoleDisplay(userRole)}</p>
              <p className="text-xs sm:text-sm text-gray-500 font-arabic">منذ لحظات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedDashboard; 