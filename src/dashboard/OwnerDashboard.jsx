import React from 'react'

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 font-arabic">
            لوحة تحكم المالك
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* إحصائيات شاملة */}
            <div className="bg-gradient-to-br from-[#6D8751] to-[#5a6f42] text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">إجمالي الإيرادات</h3>
              <p className="text-3xl font-bold">$45,678</p>
              <p className="text-sm opacity-90 font-arabic">+12% هذا الشهر</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">المستخدمين النشطين</h3>
              <p className="text-3xl font-bold">2,847</p>
              <p className="text-sm opacity-90 font-arabic">+8% هذا الأسبوع</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">المشاهدات الشهرية</h3>
              <p className="text-3xl font-bold">156,789</p>
              <p className="text-sm opacity-90 font-arabic">+15% هذا الشهر</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 font-arabic">المقالات المنشورة</h3>
              <p className="text-3xl font-bold">892</p>
              <p className="text-sm opacity-90 font-arabic">+23 هذا الشهر</p>
            </div>
          </div>
          
          {/* إدارة النظام */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 font-arabic">إدارة النظام</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="bg-[#6D8751] text-white px-4 py-3 rounded-lg hover:bg-[#5a6f42] transition-colors font-arabic">
                إدارة المستخدمين والصلاحيات
              </button>
              <button className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors font-arabic">
                إعدادات النظام
              </button>
              <button className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-arabic">
                التقارير المالية
              </button>
              <button className="bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition-colors font-arabic">
                إدارة المحتوى
              </button>
              <button className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors font-arabic">
                النسخ الاحتياطية
              </button>
              <button className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-arabic">
                سجل النظام
              </button>
            </div>
          </div>
          
          {/* نظرة عامة على الأداء */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 font-arabic">نظرة عامة على الأداء</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* أحدث النشاطات */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 font-arabic">أحدث النشاطات</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 font-arabic">تم إضافة مستخدم جديد</p>
                      <p className="text-gray-600 text-sm font-arabic">أحمد محمد - محرر</p>
                    </div>
                    <span className="text-xs text-gray-500 font-arabic">منذ 5 دقائق</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 font-arabic">تم نشر مقال جديد</p>
                      <p className="text-gray-600 text-sm font-arabic">"تطور التكنولوجيا الحديثة"</p>
                    </div>
                    <span className="text-xs text-gray-500 font-arabic">منذ ساعة</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 font-arabic">تم تحديث النظام</p>
                      <p className="text-gray-600 text-sm font-arabic">الإصدار 2.1.0</p>
                    </div>
                    <span className="text-xs text-gray-500 font-arabic">منذ 3 ساعات</span>
                  </div>
                </div>
              </div>
              
              {/* إحصائيات سريعة */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 font-arabic">إحصائيات سريعة</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="font-arabic">معدل النمو الشهري</span>
                    <span className="font-bold text-green-600">+18%</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="font-arabic">معدل الاحتفاظ بالمستخدمين</span>
                    <span className="font-bold text-blue-600">87%</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="font-arabic">متوسط وقت الجلسة</span>
                    <span className="font-bold text-purple-600">12 دقيقة</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="font-arabic">معدل التفاعل</span>
                    <span className="font-bold text-orange-600">4.2/5</span>
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

export default OwnerDashboard
