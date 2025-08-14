import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ViewArticle = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { articleId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (currentUser && articleId) {
      loadArticle();
    }
  }, [currentUser, articleId]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('جاري تحميل المقال للعرض:', articleId);

      const articleRef = doc(db, 'articles', articleId);
      const articleDoc = await getDoc(articleRef);

      if (!articleDoc.exists()) {
        throw new Error('المقال غير موجود');
      }

      const articleData = articleDoc.data();
      
      // Handle dates safely
      let createdAt, updatedAt, editedAt, approvedAt, rejectedAt;
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
        editedAt = articleData.editedAt?.toDate?.() || new Date(articleData.editedAt) || null;
      } catch (dateError) {
        editedAt = null;
      }

      try {
        approvedAt = articleData.approvedAt?.toDate?.() || new Date(articleData.approvedAt) || null;
      } catch (dateError) {
        approvedAt = null;
      }

      try {
        rejectedAt = articleData.rejectedAt?.toDate?.() || new Date(articleData.rejectedAt) || null;
      } catch (dateError) {
        rejectedAt = null;
      }

      setArticle({
        id: doc.id,
        ...articleData,
        createdAt,
        updatedAt,
        editedAt,
        approvedAt,
        rejectedAt
      });

      console.log('تم تحميل المقال بنجاح:', articleData.title);

    } catch (error) {
      console.error('خطأ في تحميل المقال:', error);
      setError(error.message || 'حدث خطأ أثناء تحميل المقال');
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      'draft': 'مسودة',
      'under_review': 'قيد المراجعة',
      'edited': 'تم التحرير',
      'approved': 'تمت الموافقة',
      'published': 'منشور',
      'rejected': 'مرفوض'
    };
    return statusLabels[status] || status;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'draft': 'bg-gray-100 text-gray-800',
      'under_review': 'bg-yellow-100 text-yellow-800',
      'edited': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
      'published': 'bg-purple-100 text-purple-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
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

  const getWordCount = (content) => {
    if (!content) return 0;
    return content.split(' ').filter(word => word.trim()).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
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
          <button
            onClick={() => navigate('/dashboard/editor')}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            العودة للوحة المحرر
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
              <h1 className="text-3xl font-bold text-gray-900">معاينة المقال</h1>
              <p className="text-gray-600 mt-2">مراجعة تفاصيل المقال قبل اتخاذ القرار</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/dashboard/editor')}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                العودة للوحة المحرر
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Article Header */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.summary || 'لا يوجد ملخص'}</p>
                
                {/* Article Meta */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">الكاتب:</span>
                    <span className="text-gray-600 mr-2"> {article.authorName}</span>
                    <span className="text-xs text-gray-500">({article.authorRole})</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">التصنيف:</span>
                    <span className="text-gray-600 mr-2"> {article.category || 'عام'}</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">عدد الكلمات:</span>
                    <span className="text-gray-600 mr-2"> {getWordCount(article.content)}</span>
                  </div>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-700">الكلمات المفتاحية:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="ml-4">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(article.status)}`}>
                  {getStatusLabel(article.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">محتوى المقال</h3>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {article.content}
              </div>
            </div>
          </div>

          {/* Article Timeline */}
          <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">سجل المقال</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">إنشاء المقال:</span>
                <span className="text-gray-600 mr-2"> {formatDate(article.createdAt)}</span>
              </div>
              
              {article.updatedAt && article.updatedAt !== article.createdAt && (
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-700">آخر تحديث:</span>
                  <span className="text-gray-600 mr-2"> {formatDate(article.updatedAt)}</span>
                </div>
              )}
              
              {article.editedAt && (
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-700">تم التحرير:</span>
                  <span className="text-gray-600 mr-2"> {formatDate(article.editedAt)}</span>
                  {article.editorName && (
                    <span className="text-xs text-gray-500">بواسطة: {article.editorName}</span>
                  )}
                </div>
              )}
              
              {article.approvedAt && (
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-700">تمت الموافقة:</span>
                  <span className="text-gray-600 mr-2"> {formatDate(article.approvedAt)}</span>
                  {article.editorName && (
                    <span className="text-xs text-gray-500">بواسطة: {article.editorName}</span>
                  )}
                </div>
              )}
              
              {article.rejectedAt && (
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-700">تم الرفض:</span>
                  <span className="text-gray-600 mr-2"> {formatDate(article.rejectedAt)}</span>
                  {article.editorName && (
                    <span className="text-xs text-gray-500">بواسطة: {article.editorName}</span>
                  )}
                </div>
              )}
            </div>

            {/* Editor Feedback */}
            {article.editorFeedback && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">ملاحظات المحرر:</h4>
                <p className="text-sm text-yellow-700">{article.editorFeedback}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-6 border-t border-gray-200 bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">الإجراءات</h3>
            
            {article.status === 'under_review' && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    // Navigate back to editor dashboard to perform actions
                    navigate('/dashboard/editor');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                  ✏️ تم التحرير
                </button>
                
                {currentUser.role === 'editor-in-chief' && (
                  <button
                    onClick={() => {
                      navigate('/dashboard/editor');
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                  >
                    ✅ موافقة
                  </button>
                )}
                
                <button
                  onClick={() => {
                    navigate('/dashboard/editor');
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
                >
                  ❌ رفض
                </button>
              </div>
            )}

            {article.status === 'edited' && (
              <div className="flex flex-wrap gap-3">
                {currentUser.role === 'editor-in-chief' ? (
                  <button
                    onClick={() => {
                      navigate('/dashboard/editor');
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                  >
                    ✅ موافقة نهائية
                  </button>
                ) : (
                  <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-md">
                    ⏳ في انتظار موافقة رئيس التحرير
                  </div>
                )}
              </div>
            )}

            {article.status === 'approved' && (
              <div className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-md">
                ✅ تمت الموافقة على المقال
              </div>
            )}

            {article.status === 'rejected' && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-md">
                ❌ تم رفض المقال
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewArticle; 