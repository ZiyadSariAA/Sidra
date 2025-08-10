import React from 'react'

const Overview = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-sm border border-gray-100/50 p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-4xl shadow-lg shadow-[#6D8751]/25">
            📊
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6D8751] to-[#5a6f42] bg-clip-text text-transparent mb-3 font-arabic">
            مرحباً بك في لوحة التحكم
          </h1>
          <p className="text-gray-600 text-lg font-arabic max-w-2xl mx-auto">
            استكشف إحصائياتك، وأدر محتواك، وطور منصة سِدره الرقمية
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-arabic mb-1">إجمالي المقالات</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
              📝
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-arabic mb-1">المسلسلات</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
              🎬
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-arabic mb-1">الحلقات</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
              🎧
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-arabic mb-1">المشاهدات</p>
              <p className="text-2xl font-bold text-gray-900">12.5K</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white">
              👁️
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          النشاط الأخير
        </h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-sm font-bold ml-4">
              ن
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 font-arabic">تم نشر مقال جديد "أساسيات التصميم الرقمي"</p>
              <p className="text-sm text-gray-500 font-arabic">منذ ساعتين</p>
            </div>
          </div>
          <div className="flex items-center p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-sm font-bold ml-4">
              ح
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 font-arabic">تم رفع حلقة جديدة من مسلسل "تقنيات المستقبل"</p>
              <p className="text-sm text-gray-500 font-arabic">منذ 4 ساعات</p>
            </div>
          </div>
          <div className="flex items-center p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-sm font-bold ml-4">
              ت
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 font-arabic">تم تحديث إعدادات الموقع</p>
              <p className="text-sm text-gray-500 font-arabic">منذ يوم واحد</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
