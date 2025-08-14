import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const WriteArticle = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [article, setArticle] = useState({
    title: '',
    content: '',
    summary: '',
    tags: '',
    category: 'general'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!currentUser) {
        throw new Error('يجب تسجيل الدخول أولاً');
      }

      // Create article object
      const articleData = {
        ...article,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email,
        authorRole: currentUser.role,
        status: 'draft', // draft, submitted, under_review, edited, approved, published, rejected
        createdAt: new Date(), // Use local date instead of serverTimestamp for faster response
        updatedAt: new Date(),
        tags: article.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        wordCount: article.content.split(' ').filter(word => word.trim()).length
      };

      console.log('جاري حفظ المقال...', articleData);

      // Add timeout to prevent hanging
      const savePromise = addDoc(collection(db, 'articles'), articleData);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('انتهت مهلة الحفظ - يرجى المحاولة مرة أخرى')), 30000) // 30 seconds timeout
      );

      // Race between save and timeout
      const docRef = await Promise.race([savePromise, timeoutPromise]);
      
      console.log('تم حفظ المقال بنجاح:', docRef.id);
      
      setSuccess('تم حفظ المقال بنجاح! يمكنك الآن إرساله للمراجعة.');
      
      // Clear form after success
      setArticle({
        title: '',
        content: '',
        summary: '',
        tags: '',
        category: 'general'
      });

    } catch (error) {
      console.error('خطأ في حفظ المقال:', error);
      
      let userMessage = 'حدث خطأ أثناء حفظ المقال';
      
      if (error.message.includes('انتهت مهلة الحفظ')) {
        userMessage = 'انتهت مهلة الحفظ - يرجى المحاولة مرة أخرى';
      } else if (error.code === 'permission-denied') {
        userMessage = 'ليس لديك صلاحية لحفظ المقالات';
      } else if (error.code === 'unavailable') {
        userMessage = 'Firebase غير متاح - يرجى التحقق من الاتصال';
      } else if (error.message) {
        userMessage = error.message;
      }
      
      setError(userMessage);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'general', label: 'عام' },
    { value: 'technology', label: 'تقنية' },
    { value: 'science', label: 'علوم' },
    { value: 'culture', label: 'ثقافة' },
    { value: 'politics', label: 'سياسة' },
    { value: 'sports', label: 'رياضة' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">كتابة مقال جديد</h1>
              <p className="text-gray-600 mt-2">اكتب مقالك وأرسله للمراجعة</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              العودة للوحة التحكم
            </button>
          </div>
        </div>

        {/* Article Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Messages */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان المقال *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={article.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="أدخل عنوان المقال"
                />
              </div>

              {/* Summary */}
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                  ملخص المقال
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows="3"
                  value={article.summary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="اكتب ملخصاً مختصراً للمقال"
                />
              </div>

              {/* Category and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    التصنيف
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={article.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    الكلمات المفتاحية
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={article.tags}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="كلمة1, كلمة2, كلمة3"
                  />
                  <p className="text-sm text-gray-500 mt-1">افصل الكلمات بفواصل</p>
                </div>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  محتوى المقال *
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  rows="15"
                  value={article.content}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="اكتب محتوى المقال هنا..."
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    عدد الكلمات: {article.content.split(' ').filter(word => word.trim()).length}
                  </p>
                  <p className="text-sm text-gray-500">
                    الحد الأدنى: 100 كلمة
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={loading || article.content.split(' ').filter(word => word.trim()).length < 100}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    'حفظ المقال'
                  )}
                </button>
              </div>

              {/* Help Text */}
              {loading && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-blue-700">
                      جاري حفظ المقال... قد يستغرق هذا بضع ثوانٍ
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    إذا استغرق الحفظ أكثر من 30 ثانية، سيتم إيقاف العملية تلقائياً
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle; 