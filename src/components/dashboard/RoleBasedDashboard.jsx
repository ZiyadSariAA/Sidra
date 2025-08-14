import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { getRoleDisplayName } from '../../utils/roles';

const RoleBasedDashboard = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
      'writer': 'يمكنك كتابة المقالات وإدارتها',
      'editor': 'يمكنك مراجعة وتحرير المقالات',
      'editor-in-chief': 'يمكنك الموافقة النهائية على المقالات',
      'reader': 'يمكنك قراءة المقالات المعتمدة'
    };
    return descriptions[role] || 'دور غير محدد';
  };

  const getDashboardActions = (role) => {
    const actions = {
      'writer': [
        { label: '✍️ كتابة مقال جديد', path: '/dashboard/write', color: 'bg-blue-600 hover:bg-blue-700' },
        { label: '📝 مقالاتي', path: '/dashboard/my-articles', color: 'bg-green-600 hover:bg-green-700' },
        { label: '👤 الملف الشخصي', path: '/dashboard/profile', color: 'bg-purple-600 hover:bg-purple-700' }
      ],
      'editor': [
        { label: '📋 مراجعة المقالات', path: '/dashboard/editor', color: 'bg-indigo-600 hover:bg-indigo-700' },
        { label: '✍️ كتابة مقال جديد', path: '/dashboard/write', color: 'bg-blue-600 hover:bg-blue-700' },
        { label: '📝 مقالاتي', path: '/dashboard/my-articles', color: 'bg-green-600 hover:bg-green-700' },
        { label: '👤 الملف الشخصي', path: '/dashboard/profile', color: 'bg-purple-600 hover:bg-purple-700' }
      ],
      'editor-in-chief': [
        { label: '🎯 لوحة رئيس التحرير', path: '/dashboard/chief', color: 'bg-red-600 hover:bg-red-700' },
        { label: '📋 مراجعة المقالات', path: '/dashboard/editor', color: 'bg-indigo-600 hover:bg-indigo-700' },
        { label: '✍️ كتابة مقال جديد', path: '/dashboard/write', color: 'bg-blue-600 hover:bg-blue-700' },
        { label: '📝 مقالاتي', path: '/dashboard/my-articles', color: 'bg-green-600 hover:bg-green-700' },
        { label: '👤 الملف الشخصي', path: '/dashboard/profile', color: 'bg-purple-600 hover:bg-purple-700' }
      ]
    };
    return actions[role] || actions['writer'];
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // استخدام userProfile.role بدلاً من currentUser.role
  const userRole = userProfile?.role || 'writer';
  
  console.log('RoleBasedDashboard - currentUser:', currentUser);
  console.log('RoleBasedDashboard - userProfile:', userProfile);
  console.log('RoleBasedDashboard - userRole:', userRole);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            مرحباً بك في لوحة التحكم
          </h1>
          <p className="text-xl text-gray-600">
            {userProfile?.displayName || currentUser.displayName || currentUser.email}
          </p>
          <div className="mt-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              userRole === 'editor-in-chief' 
                ? 'bg-red-100 text-red-800' 
                : userRole === 'editor'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {getRoleDisplay(userRole)}
            </span>
          </div>
          <p className="text-gray-500 mt-2">
            {getRoleDescription(userRole)}
          </p>
        </div>

        {/* Dashboard Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getDashboardActions(userRole).map((action, index) => (
            <div
              key={index}
              className={`${action.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
              onClick={() => navigate(action.path)}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{action.label.split(' ')[0]}</div>
                <div className="text-lg font-semibold">{action.label.split(' ').slice(1).join(' ')}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedDashboard; 