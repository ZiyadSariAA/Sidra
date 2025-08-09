import React from 'react'

const EditorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 font-arabic">
            لوحة تحكم المحرر
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* إحصائيات سريعة */}
            <div className="bg-gradient-to-br from-[#6D8751] to-[#5a6f42] text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">مقالاتي</h3>
              <p className="text-3xl font-bold">45</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">قيد التحرير</h3>
              <p className="text-3xl font-bold">8</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">منشورة</h3>
              <p className="text-3xl font-bold">37</p>
            </div>
          </div>
          
          {/* مقالاتي */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 font-arabic">مقالاتي الأخيرة</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 font-arabic">عنوان المقال الأول</h3>
                    <p className="text-gray-600 text-sm font-arabic">تاريخ النشر: 15 ديسمبر 2024</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-arabic">منشور</span>
                </div>
                
                <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 font-arabic">عنوان المقال الثاني</h3>
                    <p className="text-gray-600 text-sm font-arabic">تاريخ النشر: 12 ديسمبر 2024</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-arabic">قيد المراجعة</span>
                </div>
                
                <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 font-arabic">عنوان المقال الثالث</h3>
                    <p className="text-gray-600 text-sm font-arabic">تاريخ النشر: 10 ديسمبر 2024</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-arabic">قيد التحرير</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* إجراءات سريعة */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 font-arabic">إجراءات سريعة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-[#6D8751] text-white px-4 py-3 rounded-lg hover:bg-[#5a6f42] transition-colors font-arabic">
                كتابة مقال جديد
              </button>
              <button className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-arabic">
                تحرير مقال
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorDashboard
