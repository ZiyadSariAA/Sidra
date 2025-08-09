import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* حقوق النشر */}
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            جميع الحقوق محفوظة لشركة سِدره للنشر والتوزيع 2025 ©
          </div>
          
          {/* روابط إضافية */}
          <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-600">
            <a href="#privacy" className="hover:text-[#6D8751] transition-colors hover:scale-105 transition-transform duration-200">
              سياسة الخصوصية
            </a>
            <a href="#terms" className="hover:text-[#6D8751] transition-colors hover:scale-105 transition-transform duration-200">
              شروط الاستخدام
            </a>
            <a href="#contact" className="hover:text-[#6D8751] transition-colors hover:scale-105 transition-transform duration-200">
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 