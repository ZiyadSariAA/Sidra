import React from 'react'

const Settings = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-sm border border-gray-100/50 p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-4xl shadow-lg shadow-[#6D8751]/25">
            ⚙️
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6D8751] to-[#5a6f42] bg-clip-text text-transparent mb-3 font-arabic">
            الإعدادات
          </h1>
          <p className="text-gray-600 text-lg font-arabic max-w-2xl mx-auto">
            إعدادات حسابك وتفضيلاتك الشخصية
          </p>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          الملف الشخصي
        </h2>
        
        <div className="space-y-6">
          {/* Avatar */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#6D8751] to-[#5a6f42] flex items-center justify-center text-white text-3xl font-bold">
              أ
            </div>
            <button className="text-sm text-[#6D8751] hover:text-[#5a6f42] font-arabic">تغيير الصورة</button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">الاسم الكامل</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic"
              placeholder="أدخل اسمك الكامل"
              defaultValue="أحمد محمد"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">اسم المستخدم</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic"
              placeholder="أدخل اسم المستخدم"
              defaultValue="ahmed_mohamed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">البريد الإلكتروني</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic"
              placeholder="أدخل بريدك الإلكتروني"
              defaultValue="ahmed@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">رقم الهاتف</label>
            <input
              type="tel"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic"
              placeholder="أدخل رقم هاتفك"
              defaultValue="+966 50 123 4567"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">نبذة شخصية</label>
            <textarea
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic resize-none"
              placeholder="اكتب نبذة عن نفسك"
              defaultValue="مطور ويب ومصمم محتوى"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button className="w-full bg-gradient-to-r from-[#6D8751] to-[#5a6f42] text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 font-arabic">
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          الأمان
        </h2>
        
        <div className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">كلمة المرور الحالية</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic"
              placeholder="أدخل كلمة المرور الحالية"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">كلمة المرور الجديدة</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic"
              placeholder="أدخل كلمة المرور الجديدة"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">تأكيد كلمة المرور</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic"
              placeholder="أعد إدخال كلمة المرور الجديدة"
            />
          </div>

          {/* Two Factor */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
            <div>
              <p className="font-medium text-gray-900 font-arabic">المصادقة الثنائية</p>
              <p className="text-sm text-gray-500 font-arabic">تأمين إضافي لحسابك</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6D8751]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6D8751]"></div>
            </label>
          </div>

          {/* Change Password Button */}
          <div className="pt-4">
            <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 font-arabic">
              تغيير كلمة المرور
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          الإشعارات
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
            <div>
              <p className="font-medium text-gray-900 font-arabic">إشعارات البريد الإلكتروني</p>
              <p className="text-sm text-gray-500 font-arabic">استلام إشعارات عبر البريد</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6D8751]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6D8751]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
            <div>
              <p className="font-medium text-gray-900 font-arabic">إشعارات الموقع</p>
              <p className="text-sm text-gray-500 font-arabic">عرض الإشعارات داخل الموقع</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6D8751]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6D8751]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
            <div>
              <p className="font-medium text-gray-900 font-arabic">إشعارات التحديثات</p>
              <p className="text-sm text-gray-500 font-arabic">إشعارات عند تحديث المحتوى</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6D8751]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6D8751]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
            <div>
              <p className="font-medium text-gray-900 font-arabic">إشعارات الأمان</p>
              <p className="text-sm text-gray-500 font-arabic">تنبيهات الأمان والتسجيل</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6D8751]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6D8751]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          التفضيلات
        </h2>
        
        <div className="space-y-6">
          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">اللغة المفضلة</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic">
              <option>العربية</option>
              <option>English</option>
              <option>Français</option>
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">المنطقة الزمنية</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic">
              <option>توقيت مكة المكرمة (GMT+3)</option>
              <option>توقيت الرياض (GMT+3)</option>
              <option>توقيت دبي (GMT+4)</option>
            </select>
          </div>

          {/* Date Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">تنسيق التاريخ</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-all duration-200 font-arabic">
              <option>يوم/شهر/سنة</option>
              <option>شهر/يوم/سنة</option>
              <option>سنة/شهر/يوم</option>
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">المظهر</label>
            <div className="grid grid-cols-3 gap-4">
              <div className="border-2 border-[#6D8751] rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition-all duration-200">
                <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-white border-2 border-gray-200"></div>
                <p className="font-medium text-[#6D8751] font-arabic">فاتح</p>
              </div>
              <div className="border-2 border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition-all duration-200 hover:border-[#6D8751]">
                <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-gray-100 border-2 border-gray-200"></div>
                <p className="font-medium text-gray-700 font-arabic">متوسط</p>
              </div>
              <div className="border-2 border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition-all duration-200 hover:border-[#6D8751]">
                <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-gray-800 border-2 border-gray-200"></div>
                <p className="font-medium text-gray-700 font-arabic">داكن</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
          <span className="w-2 h-8 bg-gradient-to-b from-[#6D8751] to-[#5a6f42] rounded-full ml-3"></span>
          الخصوصية
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
            <div>
              <p className="font-medium text-gray-900 font-arabic">الملف الشخصي العام</p>
              <p className="text-sm text-gray-500 font-arabic">إظهار معلوماتك للآخرين</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6D8751]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6D8751]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
            <div>
              <p className="font-medium text-gray-900 font-arabic">تتبع النشاط</p>
              <p className="text-sm text-gray-500 font-arabic">تتبع نشاطك في الموقع</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6D8751]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6D8751]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
