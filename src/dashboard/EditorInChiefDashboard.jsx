import React from 'react'

const EditorInChiefDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 font-arabic">
            لوحة تحكم رئيس التحرير
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* إحصائيات سريعة */}
            <div className="bg-gradient-to-br from-[#6D8751] to-[#5a6f42] text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">مقالات قيد المراجعة</h3>
              <p className="text-3xl font-bold">23</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">مقالات منشورة</h3>
              <p className="text-3xl font-bold">156</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">مقالات مرفوضة</h3>
              <p className="text-3xl font-bold">7</p>
            </div>
          </div>
          
          {/* قائمة المقالات قيد المراجعة */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 font-arabic">مقالات قيد المراجعة</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 font-arabic">عنوان المقال الأول</h3>
                    <p className="text-gray-600 text-sm font-arabic">بقلم: أحمد محمد</p>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm font-arabic">موافقة</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm font-arabic">رفض</button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900 font-arabic">عنوان المقال الثاني</h3>
                    <p className="text-gray-600 text-sm font-arabic">بقلم: فاطمة علي</p>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm font-arabic">موافقة</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm font-arabic">رفض</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorInChiefDashboard
