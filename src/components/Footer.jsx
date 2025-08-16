import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t-2 border-gray-200 mt-6">
      <div className="responsive-container py-4">
        {/* الأقسام الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          
          {/* معلومات الشركة */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-gray-900">سِدرة</h3>
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto text-xs">
              منصة إعلامية عربية تركز على المحتوى الثقافي والفكري، 
              نقدم مقالات وحلقات وسلسلة تثري الفكر والثقافة
            </p>
            <div className="flex items-center justify-center space-x-3 space-x-reverse">
              <div className="w-2 h-2 bg-[#6D8751] rounded-full"></div>
              <span className="text-xs text-gray-500">منصة معتمدة</span>
            </div>
          </div>
          
          {/* معلومات التواصل */}
          <div className="text-center space-y-2">
            <h3 className="text-base font-bold text-gray-900">تواصل معنا</h3>
            <div className="space-y-1">
              <Link to="/about#contact" className="flex items-center justify-center space-x-4 space-x-reverse hover:text-[#6D8751] transition-all duration-300 group">
                <svg className="w-3 h-3 text-[#6D8751] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600 text-xs group-hover:text-[#6D8751]">معلومات التواصل</span>
              </Link>
              <Link to="/join" className="flex items-center justify-center space-x-4 space-x-reverse hover:text-[#6D8751] transition-all duration-300 group">
                <svg className="w-3 h-3 text-[#6D8751] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-gray-600 text-xs group-hover:text-[#6D8751]">انضم إلينا</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* خط فاصل */}
        <div className="border-t-2 border-gray-200 pt-3">
          <div className="text-center">
            <p className="text-gray-600 text-xs">
              جميع الحقوق محفوظة لشركة سِدرة للنشر والتوزيع © 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 