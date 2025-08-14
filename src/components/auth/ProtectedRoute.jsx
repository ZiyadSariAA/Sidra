import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser, userProfile, loading, isAuthenticated } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">جاري التحقق من الصلاحيات...</h2>
          <p className="text-gray-600">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if role is required
  if (requiredRole) {
    const hasRequiredRole = Array.isArray(requiredRole) 
      ? requiredRole.includes(userProfile?.role)
      : userProfile?.role === requiredRole;

    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-red-100 rounded-full p-4 mx-auto mb-4 w-20 h-20 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">غير مصرح لك بالوصول</h2>
            <p className="text-gray-600 mb-4">
              الدور المطلوب: {Array.isArray(requiredRole) ? requiredRole.join(' أو ') : requiredRole}
              <br />
              دورك الحالي: {userProfile?.role || 'غير محدد'}
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              العودة للصفحة السابقة
            </button>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and has required role (if any)
  return children;
};

export default ProtectedRoute; 