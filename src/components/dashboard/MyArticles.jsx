import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, orderBy, doc, updateDoc } from 'firebase/firestore';

const MyArticles = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, draft, under_review, approved, published, rejected

  useEffect(() => {
    if (currentUser) {
      loadArticles();
    }
  }, [currentUser, filter]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(''); // Clear previous errors
      console.log('جاري تحميل مقالات المستخدم...');
      console.log('معرف المستخدم:', currentUser?.uid);

      if (!currentUser?.uid) {
        throw new Error('معرف المستخدم غير متاح');
      }

      const articlesRef = collection(db, 'articles');
      
      // Simple query without orderBy first to avoid index issues
      let q = query(
        articlesRef,
        where('authorId', '==', currentUser.uid)
      );

      // Apply filter if not 'all'
      if (filter !== 'all') {
        q = query(
          articlesRef,
          where('authorId', '==', currentUser.uid),
          where('status', '==', filter)
        );
      }

      console.log('استعلام Firestore:', q);
      const querySnapshot = await getDocs(q);
      
      console.log('عدد المقالات المستلمة:', querySnapshot.size);
      
      const articlesData = [];

      querySnapshot.forEach((doc) => {
        try {
          const article = doc.data();
          console.log('مقال:', { id: doc.id, title: article.title, status: article.status, authorId: article.authorId });
          
          // Handle dates safely
          let createdAt, updatedAt;
          try {
            createdAt = article.createdAt?.toDate?.() || new Date(article.createdAt) || new Date();
          } catch (dateError) {
            console.warn('خطأ في تنسيق تاريخ الإنشاء:', dateError);
            createdAt = new Date();
          }
          
          try {
            updatedAt = article.updatedAt?.toDate?.() || new Date(article.updatedAt) || new Date();
          } catch (dateError) {
            console.warn('خطأ في تنسيق تاريخ التحديث:', dateError);
            updatedAt = new Date();
          }
          
          articlesData.push({
            id: doc.id,
            ...article,
            createdAt,
            updatedAt
          });
        } catch (docError) {
          console.error('خطأ في معالجة مقال:', doc.id, docError);
        }
      });

      // Sort articles by creation date (newest first)
      articlesData.sort((a, b) => b.createdAt - a.createdAt);

      setArticles(articlesData);
      console.log(`تم تحميل ${articlesData.length} مقال بنجاح`);

    } catch (error) {
      console.error('خطأ في تحميل المقالات:', error);
      console.error('تفاصيل الخطأ:', error.message);
      console.error('نوع الخطأ:', error.code);
      
      let userMessage = 'حدث خطأ أثناء تحميل المقالات';
      
      if (error.code === 'permission-denied') {
        userMessage = 'ليس لديك صلاحية لعرض المقالات';
      } else if (error.code === 'unavailable') {
        userMessage = 'Firebase غير متاح - يرجى التحقق من الاتصال';
      } else if (error.message.includes('معرف المستخدم غير متاح')) {
        userMessage = 'جاري تحميل بيانات المستخدم...';
      } else {
        userMessage = `خطأ: ${error.message}`;
      }
      
      setError(userMessage);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'published':
        return 'منشور';
      case 'approved':
        return 'موافق عليه';
      case 'under_review':
        return 'قيد المراجعة';
      case 'draft':
        return 'مسودة';
      case 'rejected':
        return 'مرفوض';
      default:
        return 'غير محدد';
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      'general': 'عام',
      'technology': 'تقنية',
      'science': 'علوم',
      'culture': 'ثقافة',
      'politics': 'سياسة',
      'sports': 'رياضة'
    };
    return categories[category] || category;
  };

  const formatDate = (date) => {
    if (!date) return 'غير محدد';
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleEditArticle = (articleId) => {
    // Navigate to edit page
    console.log('تعديل المقال:', articleId);
    navigate(`/dashboard/edit-article/${articleId}`);
  };

  const handleDeleteArticle = async (articleId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      try {
        // For now, just mark as deleted
        const articleRef = doc(db, 'articles', articleId);
        await updateDoc(articleRef, {
          status: 'deleted',
          updatedAt: new Date()
        });
        
        // Reload articles
        loadArticles();
        
      } catch (error) {
        console.error('خطأ في حذف المقال:', error);
        setError('حدث خطأ أثناء حذف المقال');
      }
    }
  };

  const handleSubmitForReview = async (articleId) => {
    if (window.confirm('هل تريد إرسال هذا المقال للمراجعة؟')) {
      try {
        const articleRef = doc(db, 'articles', articleId);
        await updateDoc(articleRef, {
          status: 'under_review',
          updatedAt: new Date()
        });
        
        // Reload articles
        loadArticles();
        
      } catch (error) {
        console.error('خطأ في إرسال المقال للمراجعة:', error);
        setError('حدث خطأ أثناء إرسال المقال للمراجعة');
      }
    }
  };

  const filterOptions = [
    { value: 'all', label: 'جميع المقالات' },
    { value: 'draft', label: 'المسودات' },
    { value: 'under_review', label: 'قيد المراجعة' },
    { value: 'approved', label: 'الموافق عليها' },
    { value: 'published', label: 'المنشورة' },
    { value: 'rejected', label: 'المرفوضة' }
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">غير مسموح لك بالوصول</h2>
          <p className="text-gray-600">يرجى تسجيل الدخول أولاً</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">مقالاتي</h1>
              <p className="text-gray-600 mt-2">إدارة مقالاتك الشخصية</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/dashboard/write')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                ✍️ كتابة مقال جديد
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                العودة للوحة التحكم
              </button>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">تصفية المقالات:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-500">
                {articles.length} مقال
              </span>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white shadow rounded-lg">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">جاري تحميل المقالات...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-500">
                <p className="text-lg mb-2">لا توجد مقالات</p>
                <p className="text-sm">ابدأ بكتابة مقال جديد!</p>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العنوان
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التصنيف
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ الإنشاء
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      عدد الكلمات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {article.title}
                          </div>
                          {article.summary && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {article.summary}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {getCategoryLabel(article.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                            {getStatusLabel(article.status)}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {article.status === 'under_review' && '⏳ في انتظار مراجعة المحرر'}
                            {article.status === 'approved' && '✅ تمت الموافقة من المحرر'}
                            {article.status === 'published' && '🚀 تم النشر من رئيس التحرير'}
                            {article.status === 'rejected' && '❌ تم رفض المقال'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {article.wordCount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {/* Show edit button only for draft articles */}
                          {article.status === 'draft' && (
                            <button
                              onClick={() => handleEditArticle(article.id)}
                              className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded hover:bg-indigo-50"
                            >
                              ✏️ تعديل
                            </button>
                          )}
                          
                          {/* Show submit for review button only for draft articles */}
                          {article.status === 'draft' && (
                            <button
                              onClick={() => handleSubmitForReview(article.id)}
                              className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50"
                            >
                              📤 إرسال للمراجعة
                            </button>
                          )}
                          
                          {/* Show delete button only for draft articles */}
                          {article.status === 'draft' && (
                            <button
                              onClick={() => handleDeleteArticle(article.id)}
                              className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                            >
                              🗑️ حذف
                            </button>
                          )}
                          
                          {/* Show status info for non-draft articles */}
                          {article.status !== 'draft' && (
                            <div className="flex flex-col space-y-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                                {getStatusLabel(article.status)}
                              </span>
                              <span className="text-gray-400 text-xs">
                                {article.status === 'under_review' && '⏳ في انتظار مراجعة المحرر'}
                                {article.status === 'approved' && '✅ تمت الموافقة من المحرر'}
                                {article.status === 'published' && '🚀 تم النشر من رئيس التحرير'}
                                {article.status === 'rejected' && '❌ تم رفض المقال'}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyArticles; 