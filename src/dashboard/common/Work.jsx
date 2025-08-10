import React from 'react'

const Work = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-sm border border-gray-100/50 p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-4xl shadow-lg shadow-[#6D8751]/25">
            💼
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6D8751] to-[#5a6f42] bg-clip-text text-transparent mb-3 font-arabic">
            إدارة العمل والمشاريع
          </h1>
          <p className="text-gray-600 text-lg font-arabic max-w-2xl mx-auto">
            نظم مهامك، تابع مشاريعك، وحسن إنتاجيتك في منصة سِدره
          </p>
        </div>
      </div>

      {/* Project Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl">
              📋
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">12</h3>
            <p className="text-gray-600 font-arabic">مشروع نشط</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-2xl">
              ✅
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">8</h3>
            <p className="text-gray-600 font-arabic">مشروع مكتمل</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-2xl">
              ⏳
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">3</h3>
            <p className="text-gray-600 font-arabic">في الانتظار</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-2xl">
              🚨
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">1</h3>
            <p className="text-gray-600 font-arabic">متأخر</p>
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          المشاريع النشطة
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-lg font-bold ml-3">
                  م
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-arabic">مشروع تطوير المحتوى الرقمي</h3>
                  <p className="text-gray-600 font-arabic">تطوير سلسلة مقالات عن التكنولوجيا الحديثة</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-arabic">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-[#6D8751] to-[#5a6f42] h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 font-arabic">
              <span>تاريخ الانتهاء: 15 ديسمبر 2024</span>
              <span>3 مهام متبقية</span>
            </div>
          </div>

          <div className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-lg font-bold ml-3">
                  ص
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-arabic">سلسلة المسلسلات الصوتية</h3>
                  <p className="text-gray-600 font-arabic">إنتاج 10 حلقات جديدة للمسلسل التعليمي</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-arabic">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-[#6D8751] to-[#5a6f42] h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 font-arabic">
              <span>تاريخ الانتهاء: 30 ديسمبر 2024</span>
              <span>6 مهام متبقية</span>
            </div>
          </div>

          <div className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-lg font-bold ml-3">
                  ت
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-arabic">تحديث واجهة المستخدم</h3>
                  <p className="text-gray-600 font-arabic">تحسين تجربة المستخدم وإضافة ميزات جديدة</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-arabic">20%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-[#6D8751] to-[#5a6f42] h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 font-arabic">
              <span>تاريخ الانتهاء: 10 يناير 2025</span>
              <span>8 مهام متبقية</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-6 rounded-xl bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 border border-[#6D8751]/20 hover:border-[#6D8751]/40 transition-all duration-300 hover:scale-105 group">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                ➕
              </div>
              <p className="font-medium text-[#6D8751] font-arabic text-lg">مشروع جديد</p>
            </div>
          </button>

          <button className="p-6 rounded-xl bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 border border-[#6D8751]/20 hover:border-[#6D8751]/40 transition-all duration-300 hover:scale-105 group">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                📝
              </div>
              <p className="font-medium text-[#6D8751] font-arabic text-lg">مهمة جديدة</p>
            </div>
          </button>

          <button className="p-6 rounded-xl bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 border border-[#6D8751]/20 hover:border-[#6D8751]/40 transition-all duration-300 hover:scale-105 group">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                📊
              </div>
              <p className="font-medium text-[#6D8751] font-arabic text-lg">تقرير الأداء</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Work
