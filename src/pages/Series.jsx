import React from 'react'
import { Link } from 'react-router-dom'

const Series = () => {
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
                <li className="text-gray-900">سلسلة</li>
              </ol>
            </nav>

            {/* العنوان الرئيسي */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              السلسلة
            </h1>
            
            {/* رسالة قريباً */}
            <div className="bg-gradient-to-br from-[#6D8751] to-[#5a6f42] rounded-2xl p-12 text-white shadow-xl">
              <div className="mb-8">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">قريباً</h2>
                <p className="text-xl opacity-90 leading-relaxed">
                  نحن نعمل على إعداد مجموعة رائعة من السلسلة الثقافية والفكرية
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">سلسلة تاريخية</h3>
                <p className="text-gray-600">
                  سلسلة تتعمق في تاريخ العالم العربي وأهم المحطات التاريخية
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#6D8751] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">سلسلة فكرية</h3>
                <p className="text-gray-600">
                  سلسلة تطرح أفكاراً جديدة وتناقش القضايا المعاصرة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Series
