import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('جاري تحميل المقال:', articleId);

      const articleRef = doc(db, 'articles', articleId);
      const articleDoc = await getDoc(articleRef);

      if (!articleDoc.exists()) {
        throw new Error('المقال غير موجود');
      }

      const articleData = articleDoc.data();
      
      // Check if article is approved
      if (articleData.status !== 'approved') {
        throw new Error('هذا المقال غير متاح للقراءة');
      }

      // Handle dates safely
      let createdAt, updatedAt, approvedAt;
      try {
        createdAt = articleData.createdAt?.toDate?.() || new Date(articleData.createdAt) || new Date();
      } catch (dateError) {
        console.warn('خطأ في تنسيق تاريخ الإنشاء:', dateError);
        createdAt = new Date();
      }

      try {
        updatedAt = articleData.updatedAt?.toDate?.() || new Date(articleData.updatedAt) || new Date();
      } catch (dateError) {
        console.warn('خطأ في تنسيق تاريخ التحديث:', dateError);
        updatedAt = new Date();
      }

      try {
        approvedAt = articleData.approvedAt?.toDate?.() || new Date(articleData.approvedAt) || null;
      } catch (dateError) {
        approvedAt = null;
      }

      setArticle({
        id: doc.id,
        ...articleData,
        createdAt,
        updatedAt,
        approvedAt,
        likes: articleData.likes || 0
      });

      console.log('تم تحميل المقال بنجاح:', articleData.title);

    } catch (error) {
      console.error('خطأ في تحميل المقال:', error);
      setError(error.message || 'حدث خطأ أثناء تحميل المقال');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (liked) return; // Prevent multiple likes

    try {
      const articleRef = doc(db, 'articles', articleId);
      await updateDoc(articleRef, {
        likes: increment(1)
      });

      // Update local state
      setArticle(prev => ({
        ...prev,
        likes: (prev.likes || 0) + 1
      }));
      setLiked(true);

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
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return 'تاريخ غير صحيح';
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
    return categories[category] || 'عام';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المقال...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h3 className="text-lg font-medium">خطأ في تحميل المقال</h3>
            <p className="text-sm mt-2">{error}</p>
          </div>
          <Link
            to="/articles"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            العودة للمقالات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/articles"
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <span className="mr-2">←</span>
            العودة للمقالات
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Article Image Placeholder */}
          <div className="h-64 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-white text-6xl font-bold">
              {article.title.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Article Meta */}
          <div className="p-6">
            {/* Category and Date */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {getCategoryLabel(article.category)}
              </span>
              <span className="text-sm text-gray-500">
                📅 {formatDate(article.createdAt)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>

            {/* Summary */}
            {article.summary && (
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {article.summary}
              </p>
            )}

            {/* Article Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-4">
                <span>👤 {article.authorName}</span>
                <span>📝 {getWordCount(article.content)} كلمة</span>
                {article.approvedAt && (
                  <span>✅ تمت الموافقة: {formatDate(article.approvedAt)}</span>
                )}
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Like Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleLike}
                disabled={liked}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  liked 
                    ? 'text-red-600 bg-red-50 cursor-not-allowed' 
                    : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                <span className="text-xl">{liked ? '❤️' : '🤍'}</span>
                <span className="font-medium">
                  {liked ? 'أعجبتك' : 'أعجبني'} ({article.likes || 0})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">محتوى المقال</h2>
          
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
              {article.content}
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>تم النشر بواسطة: {article.authorName}</span>
              <span>آخر تحديث: {formatDate(article.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Related Articles Suggestion */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">اقرأ المزيد</h3>
          <p className="text-gray-600 mb-4">
            استمتع بقراءة المزيد من المقالات المميزة في موقعنا
          </p>
          <Link
            to="/articles"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            عرض جميع المقالات
            <span className="mr-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail; 