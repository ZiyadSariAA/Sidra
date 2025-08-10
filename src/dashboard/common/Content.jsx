import React from 'react'

const Content = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-sm border border-gray-100/50 p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-4xl shadow-lg shadow-[#6D8751]/25">
            📝
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6D8751] to-[#5a6f42] bg-clip-text text-transparent mb-3 font-arabic">
            إدارة المحتوى
          </h1>
          <p className="text-gray-600 text-lg font-arabic max-w-2xl mx-auto">
            أدر مقالاتك، مسلسلاتك، وحلقاتك بسهولة واحترافية
          </p>
        </div>
      </div>

      {/* Content Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105 group cursor-pointer">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300">
              📰
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">المقالات</h3>
            <p className="text-gray-600 font-arabic mb-4">إدارة المقالات والنصوص</p>
            <div className="text-2xl font-bold text-blue-600">24</div>
            <p className="text-sm text-gray-500 font-arabic">مقال منشور</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105 group cursor-pointer">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300">
              🎬
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">المسلسلات</h3>
            <p className="text-gray-600 font-arabic mb-4">إدارة المسلسلات الصوتية</p>
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="text-sm text-gray-500 font-arabic">مسلسل نشط</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 hover:shadow-md transition-all duration-300 hover:scale-105 group cursor-pointer">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300">
              🎧
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">الحلقات</h3>
            <p className="text-gray-600 font-arabic mb-4">إدارة الحلقات الصوتية</p>
            <div className="text-2xl font-bold text-green-600">156</div>
            <p className="text-sm text-gray-500 font-arabic">حلقة منشورة</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 rounded-xl bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 border border-[#6D8751]/20 hover:border-[#6D8751]/40 transition-all duration-300 hover:scale-105 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                ➕
              </div>
              <p className="font-medium text-[#6D8751] font-arabic">مقال جديد</p>
            </div>
          </button>

          <button className="p-4 rounded-xl bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 border border-[#6D8751]/20 hover:border-[#6D8751]/40 transition-all duration-300 hover:scale-105 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                🎬
              </div>
              <p className="font-medium text-[#6D8751] font-arabic">مسلسل جديد</p>
            </div>
          </button>

          <button className="p-4 rounded-xl bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 border border-[#6D8751]/20 hover:border-[#6D8751]/40 transition-all duration-300 hover:scale-105 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                🎧
              </div>
              <p className="font-medium text-[#6D8751] font-arabic">حلقة جديدة</p>
            </div>
          </button>

          <button className="p-4 rounded-xl bg-gradient-to-r from-[#6D8751]/10 to-[#5a6f42]/10 hover:from-[#6D8751]/20 hover:to-[#5a6f42]/20 border border-[#6D8751]/20 hover:border-[#6D8751]/40 transition-all duration-300 hover:scale-105 group">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300">
                📊
              </div>
              <p className="font-medium text-[#6D8751] font-arabic">تحليل المحتوى</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Content
