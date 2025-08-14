import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const ArticlesList = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    loadArticles();
  }, [filter]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('جاري تحميل المقالات المنشورة...');

      const articlesRef = collection(db, 'articles');
      
      // Query only approved articles
      let q;
      if (filter === 'all') {
        q = query(articlesRef, where('status', '==', 'approved'));
      } else {
        q = query(articlesRef, where('status', '==', 'approved'), where('category', '==', filter));
      }

      const querySnapshot = await getDocs(q);
      console.log('عدد المقالات المستلمة:', querySnapshot.size);

      const articlesData = [];
      querySnapshot.forEach((doc) => {
        try {
          const article = doc.data();
          
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
            updatedAt,
            likes: article.likes || 0
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
      setError('حدث خطأ أثناء تحميل المقالات');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (articleId) => {
    try {
      const articleRef = doc(db, 'articles', articleId);
      await updateDoc(articleRef, {
        likes: increment(1)
      });

      // Update local state
      setArticles(prev => prev.map(article => 
        article.id === articleId 
          ? { ...article, likes: (article.likes || 0) + 1 }
          : article
      ));

      console.log('تم إضافة الإعجاب بنجاح');
    } catch (error) {
      console.error('خطأ في إضافة الإعجاب:', error);
    }
  };

  const getWordCount = (content) => {
    if (!content) return 0;
    return content.split(' ').filter(word => word.trim()).length;
  };

  const formatDate = (date) => {
    if (!date) return 'غير محدد';
    try {
      return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      return 'تاريخ غير صحيح';
    }
  };

  const categories = [
    { value: 'all', label: 'جميع التصنيفات' },
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المقالات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">المقالات المنشورة</h1>
          <p className="text-xl text-gray-600">اقرأ أحدث المقالات الموافق عليها من فريق التحرير</p>
        </div>

        {/* Filter */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4">
            <div className="flex items-center justify-center space-x-4">
              <label className="text-sm font-medium text-gray-700">تصفية حسب التصنيف:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مقالات منشورة</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'لا توجد مقالات موافق عليها حالياً'
                : `لا توجد مقالات في تصنيف "${categories.find(c => c.value === filter)?.label}"`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Article Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {article.title.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {categories.find(c => c.value === article.category)?.label || 'عام'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.summary || 'لا يوجد ملخص للمقال'}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>👤 {article.authorName}</span>
                    <span>📅 {formatDate(article.createdAt)}</span>
                  </div>

                  {/* Word Count */}
                  <div className="text-sm text-gray-500 mb-4">
                    📝 {getWordCount(article.content)} كلمة
                  </div>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(article.id)}
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                    >
                      <span className="text-xl">❤️</span>
                      <span className="font-medium">{article.likes || 0}</span>
                    </button>

                    <Link
                      to={`/article/${article.id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      قراءة المقال
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Articles Count */}
        <div className="text-center mt-8 text-gray-600">
          تم عرض {articles.length} مقال من أصل {articles.length} مقال منشور
        </div>
      </div>
    </div>
  );
};

export default ArticlesList; 