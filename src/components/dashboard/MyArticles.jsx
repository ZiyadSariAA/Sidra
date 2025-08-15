import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import EmptyState from './EmptyState'
import Message from './Message'

const MyArticles = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [success, setSuccess] = useState('')

  const filterOptions = [
    { value: 'all', label: 'جميع المقالات' },
    { value: 'draft', label: 'المسودات' },
    { value: 'under_review', label: 'قيد المراجعة' },
    { value: 'approved', label: 'الموافق عليها' },
    { value: 'published', label: 'المنشورة' },
    { value: 'rejected', label: 'المرفوضة' }
  ]

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      const mockArticles = [
        {
          id: '1',
          title: 'مقدمة في تطوير الويب الحديث',
          summary: 'تعرف على أحدث التقنيات والأدوات المستخدمة في تطوير المواقع الإلكترونية',
          status: 'published',
          createdAt: new Date('2024-01-15'),
          tags: ['تقنية', 'تطوير', 'ويب'],
          wordCount: 1200
        },
        {
          id: '2',
          title: 'أساسيات الذكاء الاصطناعي',
          summary: 'دليل شامل لفهم المفاهيم الأساسية للذكاء الاصطناعي وتطبيقاته',
          status: 'under_review',
          createdAt: new Date('2024-01-20'),
          tags: ['تقنية', 'ذكاء اصطناعي', 'تعلم آلي'],
          wordCount: 1800
        }
      ]
      
      setArticles(mockArticles)
    } catch (err) {
      setError('حدث خطأ أثناء تحميل المقالات')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitForReview = async (articleId) => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setArticles(prev => prev.map(article => 
        article.id === articleId 
          ? { ...article, status: 'under_review' }
          : article
      ))
      
      setSuccess('تم إرسال المقال للمراجعة بنجاح!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('حدث خطأ أثناء إرسال المقال للمراجعة')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter(article => {
    if (filter === 'all') return true
    return article.status === filter
  })

  if (loading && articles.length === 0) {
    return <LoadingSpinner size="lg" text="جاري تحميل المقالات..." />
  }

  if (error && articles.length === 0) {
    return (
      <div className="space-y-4">
        <Message
          type="error"
          message={error}
          onClose={() => setError('')}
          showClose={true}
        />
        <button
          onClick={fetchArticles}
          className="px-6 py-2.5 text-sm font-medium text-[#6D8751] bg-[#6D8751]/10 hover:bg-[#6D8751]/20 rounded-xl transition-all duration-300 font-arabic hover:scale-105"
        >
          المحاولة مرة أخرى
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {success && (
        <Message
          type="success"
          message={success}
          onClose={() => setSuccess('')}
          showClose={true}
        />
      )}

      {/* Filter and Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-sm font-medium text-gray-700 font-arabic">تصفية المقالات:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic bg-white"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500 font-arabic">
              {filteredArticles.length} مقال
            </span>
          </div>
          
          <div className="flex space-x-3 space-x-reverse">
            <button
              onClick={() => navigate('/dashboard/write')}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#6D8751] hover:bg-[#5a6f42] rounded-xl transition-all duration-300 font-arabic shadow-sm hover:shadow-md hover:scale-105"
            >
              <svg className="w-4 h-4 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              كتابة مقال جديد
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 font-arabic hover:scale-105"
            >
              العودة للوحة التحكم
            </button>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50">
        {loading ? (
          <LoadingSpinner size="md" text="جاري تحديث البيانات..." />
        ) : filteredArticles.length === 0 ? (
          <EmptyState
            icon="📝"
            title="لا توجد مقالات"
            description={
              filter === 'all' 
                ? 'لم تقم بكتابة أي مقال بعد'
                : `لا توجد مقالات بحالة "${filterOptions.find(opt => opt.value === filter)?.label}"`
            }
            actionLabel="ابدأ بكتابة مقال جديد"
            onAction={() => navigate('/dashboard/write')}
          />
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredArticles.map((article) => (
              <div key={article.id} className="p-6 hover:bg-gray-50/50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 font-arabic">
                        {article.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.status === 'published' ? 'bg-green-100 text-green-800' :
                        article.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        article.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                        article.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {article.status === 'published' ? 'منشور' :
                         article.status === 'approved' ? 'موافق عليه' :
                         article.status === 'under_review' ? 'قيد المراجعة' :
                         article.status === 'rejected' ? 'مرفوض' :
                         'مسودة'}
                      </span>
                    </div>
                    
                    {article.summary && (
                      <p className="text-gray-600 mb-3 font-arabic line-clamp-2">
                        {article.summary}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 font-arabic">
                      <span>تاريخ الإنشاء: {article.createdAt.toLocaleDateString('ar-SA')}</span>
                      <span>عدد الكلمات: {article.wordCount || 0}</span>
                      {article.tags && article.tags.length > 0 && (
                        <span>الكلمات المفتاحية: {article.tags.join('، ')}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 space-x-reverse">
                    <button
                      onClick={() => navigate(`/dashboard/edit-article/${article.id}`)}
                      className="px-3 py-1.5 text-xs font-medium text-[#6D8751] bg-[#6D8751]/10 hover:bg-[#6D8751]/20 rounded-lg transition-all duration-200 font-arabic hover:scale-105"
                    >
                      تعديل
                    </button>
                    
                    {article.status === 'draft' && (
                      <button
                        onClick={() => handleSubmitForReview(article.id)}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg transition-all duration-200 font-arabic hover:scale-105"
                      >
                        إرسال للمراجعة
                      </button>
                    )}
                    
                    <button
                      onClick={() => navigate(`/dashboard/view-article/${article.id}`)}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 font-arabic hover:scale-105"
                    >
                      عرض
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArticles; 