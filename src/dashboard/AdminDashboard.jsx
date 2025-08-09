import React from 'react'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 font-arabic">
            لوحة تحكم المدير
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* إحصائيات سريعة */}
            <div className="bg-gradient-to-br from-[#6D8751] to-[#5a6f42] text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">إجمالي المقالات</h3>
              <p className="text-3xl font-bold">1,234</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">المستخدمين النشطين</h3>
              <p className="text-3xl font-bold">567</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">المشاهدات اليوم</h3>
              <p className="text-3xl font-bold">8,901</p>
            </div>
          </div>
          
          {/* إجراءات سريعة */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 font-arabic">إجراءات سريعة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-[#6D8751] text-white px-4 py-3 rounded-lg hover:bg-[#5a6f42] transition-colors font-arabic">
                إضافة مقال جديد
              </button>
              <button className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-arabic">
                إدارة المستخدمين
              </button>
              <button className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-arabic">
                مراجعة المحتوى
              </button>
              <button className="bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition-colors font-arabic">
                التقارير
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
