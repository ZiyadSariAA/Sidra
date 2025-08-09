import React from 'react'
import { Link } from 'react-router-dom'

const Episodes = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-500">
                <li>
                  <Link to="/" className="hover:text-[#6D8751] transition-colors">
                    الرئيسية
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900">الإذاعة</li>
              </ol>
            </nav>

            {/* العنوان الرئيسي */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              الإذاعة
            </h1>
            
            {/* رسالة قريباً */}
            <div className="bg-gradient-to-br from-[#6D8751] to-[#5a6f42] rounded-2xl p-12 text-white shadow-xl">
              <div className="mb-8">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">قريباً</h2>
                <p className="text-xl opacity-90 leading-relaxed">
                  نحن نعمل على إعداد حلقات إذاعية رائعة ومحتوى صوتي مميز
                  <br />
                  ستكون متاحة قريباً
                </p>
              </div>
            </div>

            {/* أزرار التنقل */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/articles" 
                className="inline-block bg-[#6D8751] text-white px-8 py-3 rounded-lg hover:bg-[#5a6f42] transition-colors font-medium"
              >
                تصفح المقالات
              </Link>
              <Link 
                to="/" 
                className="inline-block bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* قسم إضافي */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">ما يمكنك توقعه</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#6D8751] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">حلقات حوارية</h3>
                <p className="text-gray-600">
                  حلقات حوارية مع خبراء ومفكرين في مختلف المجالات
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#6D8751] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">بودكاست</h3>
                <p className="text-gray-600">
                  بودكاست أسبوعي يناقش آخر الأخبار والتطورات
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Episodes
