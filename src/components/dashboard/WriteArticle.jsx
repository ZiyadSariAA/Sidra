import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Message from './Message'

const WriteArticle = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [article, setArticle] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'technology',
    tags: ''
  })

  const categories = [
    { value: 'technology', label: 'تقنية' },
    { value: 'science', label: 'علوم' },
    { value: 'culture', label: 'ثقافة' },
    { value: 'politics', label: 'سياسة' },
    { value: 'sports', label: 'رياضة' },
    { value: 'health', label: 'صحة' },
    { value: 'education', label: 'تعليم' },
    { value: 'business', label: 'أعمال' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setArticle(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSuccess('تم حفظ المقال بنجاح! سيتم مراجعته قريباً.')
      setArticle({
        title: '',
        summary: '',
        content: '',
        category: 'technology',
        tags: ''
      })
    } catch (err) {
      setError('حدث خطأ أثناء حفظ المقال. يرجى المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Article Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50">
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Messages */}
            {error && (
              <Message
                type="error"
                message={error}
                onClose={() => setError('')}
                showClose={true}
              />
            )}
            
            {success && (
              <Message
                type="success"
                message={success}
                onClose={() => setSuccess('')}
                showClose={true}
              />
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                عنوان المقال *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={article.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic placeholder-gray-400"
                placeholder="أدخل عنوان المقال"
              />
            </div>

            {/* Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                ملخص المقال
              </label>
              <textarea
                id="summary"
                name="summary"
                rows="3"
                value={article.summary}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic resize-none placeholder-gray-400"
                placeholder="اكتب ملخصاً مختصراً للمقال"
              />
            </div>

            {/* Category and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الفئة
                </label>
                <select
                  id="category"
                  name="category"
                  value={article.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic bg-white"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الكلمات المفتاحية
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={article.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic placeholder-gray-400"
                  placeholder="أدخل الكلمات المفتاحية مفصولة بفواصل"
                />
                <p className="text-xs text-gray-500 mt-1 font-arabic">
                  مثال: تقنية، تطوير، برمجة
                </p>
              </div>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                محتوى المقال *
              </label>
              <textarea
                id="content"
                name="content"
                rows="12"
                required
                value={article.content}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic resize-none placeholder-gray-400"
                placeholder="اكتب محتوى مقالك هنا..."
              />
              <p className="text-xs text-gray-500 mt-1 font-arabic">
                عدد الكلمات: {article.content.split(' ').filter(word => word.trim()).length}
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 font-arabic hover:scale-105"
              >
                <svg className="w-4 h-4 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                العودة للوحة التحكم
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 text-sm font-medium text-white bg-[#6D8751] hover:bg-[#5a6f42] rounded-xl transition-all duration-300 font-arabic shadow-sm hover:shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 inline ml-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    حفظ المقال
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle; 