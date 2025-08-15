import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="responsive-container py-16">
        {/* الأقسام الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          
          {/* معلومات الشركة */}
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">سِدرة</h3>
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
              منصة إعلامية عربية تركز على المحتوى الثقافي والفكري، 
              نقدم مقالات وحلقات وسلسلة تثري الفكر والثقافة
            </p>
            <div className="flex items-center justify-center space-x-3 space-x-reverse">
              <div className="w-3 h-3 bg-[#6D8751] rounded-full"></div>
              <span className="text-sm text-gray-500">منصة معتمدة</span>
            </div>
          </div>
          
          {/* روابط سريعة */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">روابط سريعة</h3>
            <div className="space-y-4">
              <a href="/articles" className="block text-gray-600 hover:text-[#6D8751] transition-all duration-300 hover:translate-x-2 transform">
                المقالات
              </a>
              <a href="/series" className="block text-gray-600 hover:text-[#6D8751] transition-all duration-300 hover:translate-x-2 transform">
                السلسلات
              </a>
              <a href="/episodes" className="block text-gray-600 hover:text-[#6D8751] transition-all duration-300 hover:translate-x-2 transform">
                الإذاعة
              </a>
              <a href="/about" className="block text-gray-600 hover:text-[#6D8751] transition-all duration-300 hover:translate-x-2 transform">
                من نحن
              </a>
            </div>
          </div>
          
          {/* معلومات التواصل */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">تواصل معنا</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <svg className="w-6 h-6 text-[#6D8751] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600 text-base">info@sidra.com</span>
              </div>
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <svg className="w-6 h-6 text-[#6D8751] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600 text-base">+966 50 123 4567</span>
              </div>
              <a href="/join" className="flex items-center justify-center space-x-4 space-x-reverse hover:text-[#6D8751] transition-all duration-300 group">
                <svg className="w-6 h-6 text-[#6D8751] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-gray-600 text-base group-hover:text-[#6D8751]">انضم إلينا</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* خط فاصل */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* حقوق النشر */}
            <div className="text-gray-600 text-sm text-center md:text-right">
              جميع الحقوق محفوظة لشركة سِدرة للنشر والتوزيع © 2025
            </div>
            
            {/* روابط إضافية */}
            <div className="flex items-center space-x-10 space-x-reverse text-sm text-gray-600">
              <a href="#privacy" className="hover:text-[#6D8751] transition-colors duration-300 flex items-center space-x-2 space-x-reverse">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>سياسة الخصوصية</span>
              </a>
              <a href="#terms" className="hover:text-[#6D8751] transition-colors duration-300 flex items-center space-x-2 space-x-reverse">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>شروط الاستخدام</span>
              </a>
              <a href="#contact" className="hover:text-[#6D8751] transition-colors duration-300 flex items-center space-x-2 space-x-reverse">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>اتصل بنا</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 