import React from 'react'

const Analytics = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-sm border border-gray-100/50 p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-4xl shadow-lg shadow-[#6D8751]/25">
            📈
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6D8751] to-[#5a6f42] bg-clip-text text-transparent mb-3 font-arabic">
            التحليلات والإحصائيات
          </h1>
          <p className="text-gray-600 text-lg font-arabic max-w-2xl mx-auto">
            تابع أداء محتواك وافهم جمهورك بشكل أفضل
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
              👥
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full font-arabic">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">45.2K</h3>
          <p className="text-gray-600 font-arabic">إجمالي الزوار</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
              🎯
            </div>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full font-arabic">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">2.4K</h3>
          <p className="text-gray-600 font-arabic">المشاهدات الفريدة</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
              ⏱️
            </div>
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-arabic">+5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">4.2</h3>
          <p className="text-gray-600 font-arabic">متوسط وقت الجلسة</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white">
              📱
            </div>
            <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full font-arabic">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">68%</h3>
          <p className="text-gray-600 font-arabic">مستخدمي الجوال</p>
        </div>
      </div>

      {/* Content Performance */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          أداء المحتوى
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-sm font-bold ml-3">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900 font-arabic">أساسيات التصميم الرقمي</p>
                <p className="text-sm text-gray-500 font-arabic">مقال - 2.1K مشاهدة</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-[#6D8751]">+23%</div>
              <div className="text-sm text-gray-500 font-arabic">مقارنة بالأسبوع الماضي</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-sm font-bold ml-3">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900 font-arabic">تقنيات المستقبل - الحلقة 15</p>
                <p className="text-sm text-gray-500 font-arabic">حلقة صوتية - 1.8K استماع</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-[#6D8751]">+18%</div>
              <div className="text-sm text-gray-500 font-arabic">مقارنة بالأسبوع الماضي</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-sm font-bold ml-3">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900 font-arabic">الذكاء الاصطناعي في التعليم</p>
                <p className="text-sm text-gray-500 font-arabic">مقال - 1.5K مشاهدة</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-[#6D8751]">+12%</div>
              <div className="text-sm text-gray-500 font-arabic">مقارنة بالأسبوع الماضي</div>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          مصادر الزيارات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 ml-3"></div>
                <span className="font-arabic">البحث العضوي</span>
              </div>
              <span className="font-bold text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 ml-3"></div>
                <span className="font-arabic">وسائل التواصل الاجتماعي</span>
              </div>
              <span className="font-bold text-gray-900">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-500 ml-3"></div>
                <span className="font-arabic">الزيارات المباشرة</span>
              </div>
              <span className="font-bold text-gray-900">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-orange-500 ml-3"></div>
                <span className="font-arabic">المراجع الخارجية</span>
              </div>
              <span className="font-bold text-gray-900">5%</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full border-8 border-[#6D8751] border-t-transparent animate-spin"></div>
            <p className="text-gray-600 font-arabic">رسم بياني دائري</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
