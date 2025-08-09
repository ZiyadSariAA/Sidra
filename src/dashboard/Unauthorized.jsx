import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 font-arabic">
              غير مصرح لك بالوصول
            </h1>
            <p className="text-gray-600 font-arabic">
              عذراً، ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link 
              to="/" 
              className="block w-full bg-[#6D8751] text-white px-4 py-3 rounded-lg hover:bg-[#5a6f42] transition-colors font-arabic"
            >
              العودة للصفحة الرئيسية
            </Link>
            <Link 
              to="/join" 
              className="block w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-arabic"
            >
              انضم لنا
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
