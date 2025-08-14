import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditArticle = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { articleId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [article, setArticle] = useState({
    title: '',
    content: '',
    summary: '',
    tags: '',
    category: 'general'
  });

  const [originalArticle, setOriginalArticle] = useState(null);

  useEffect(() => {
    if (currentUser && articleId) {
      loadArticle();
    }
  }, [currentUser, articleId]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('جاري تحميل المقال للتعديل:', articleId);

      const articleRef = doc(db, 'articles', articleId);
      const articleDoc = await getDoc(articleRef);

      if (!articleDoc.exists()) {
        throw new Error('المقال غير موجود');
      }

      const articleData = articleDoc.data();
      
      // Check if user owns this article
      if (articleData.authorId !== currentUser.uid) {
        throw new Error('ليس لديك صلاحية لتعديل هذا المقال');
      }

      // Check if article can be edited (only drafts)
      if (articleData.status !== 'draft') {
        throw new Error('لا يمكن تعديل المقالات التي تم إرسالها للمراجعة أو نشرها');
      }

      // Convert tags array to string
      const tagsString = Array.isArray(articleData.tags) 
        ? articleData.tags.join(', ') 
        : articleData.tags || '';

      const articleToEdit = {
        title: articleData.title || '',
        content: articleData.content || '',
        summary: articleData.summary || '',
        tags: tagsString,
        category: articleData.category || 'general'
      };

      setArticle(articleToEdit);
      setOriginalArticle(articleData);

      console.log('تم تحميل المقال بنجاح:', articleToEdit);

    } catch (error) {
      console.error('خطأ في تحميل المقال:', error);
      setError(error.message || 'حدث خطأ أثناء تحميل المقال');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (!currentUser) {
        throw new Error('يجب تسجيل الدخول أولاً');
      }

      if (!originalArticle) {
        throw new Error('المقال الأصلي غير محمل');
      }

      // Validate required fields
      if (!article.title.trim()) {
        throw new Error('عنوان المقال مطلوب');
      }

      if (!article.content.trim()) {
        throw new Error('محتوى المقال مطلوب');
      }

      if (article.content.split(' ').filter(word => word.trim()).length < 100) {
        throw new Error('المقال يجب أن يحتوي على 100 كلمة على الأقل');
      }

      // Prepare updated article data
      const updatedArticle = {
        ...originalArticle,
        title: article.title.trim(),
        content: article.content.trim(),
        summary: article.summary.trim(),
        tags: article.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        category: article.category,
        updatedAt: new Date(),
        wordCount: article.content.split(' ').filter(word => word.trim()).length
      };

      console.log('جاري حفظ التعديلات...', updatedArticle);

      // Update article in Firestore
      const articleRef = doc(db, 'articles', articleId);
      await updateDoc(articleRef, updatedArticle);

      console.log('تم حفظ التعديلات بنجاح');
      setSuccess('تم حفظ التعديلات بنجاح!');

      // Update local state
      setOriginalArticle(updatedArticle);

    } catch (error) {
      console.error('خطأ في حفظ التعديلات:', error);
      setError(error.message || 'حدث خطأ أثناء حفظ التعديلات');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('هل تريد إلغاء التعديلات؟ سيتم فقدان جميع التغييرات.')) {
      navigate('/dashboard/my-articles');
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المقال...</p>
        </div>
      </div>
    );
  }

  if (error && !originalArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h3 className="text-lg font-medium">خطأ في تحميل المقال</h3>
            <p className="text-sm mt-2">{error}</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/my-articles')}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            العودة لصفحة المقالات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">تعديل المقال</h1>
              <p className="text-gray-600 mt-2">تعديل مقال: {originalArticle?.title}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                إلغاء
              </button>
              <button
                onClick={() => navigate('/dashboard/my-articles')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                العودة لصفحة المقالات
              </button>
            </div>
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

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving || article.content.split(' ').filter(word => word.trim()).length < 100}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    'حفظ التعديلات'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticle; 