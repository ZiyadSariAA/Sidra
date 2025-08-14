import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const ChiefEditorDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    underReview: 0,
    edited: 0,
    approved: 0,
    rejected: 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (currentUser) {
      // Check if user has editor-in-chief role
      if (currentUser.role !== 'editor-in-chief') {
        setError('ليس لديك صلاحية للوصول لهذه الصفحة. الدور المطلوب: رئيس التحرير');
        setLoading(false);
        return;
      }
      
      loadDashboard();
    }
  }, [currentUser]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('جاري تحميل لوحة رئيس التحرير...');

      const articlesRef = collection(db, 'articles');
      
      // Get all articles for chief editor
      const q = query(articlesRef);
      const querySnapshot = await getDocs(q);
      console.log('عدد المقالات المستلمة:', querySnapshot.size);

      const articlesData = [];
      let total = 0, underReview = 0, edited = 0, approved = 0, rejected = 0;

      querySnapshot.forEach((doc) => {
        try {
          const article = doc.data();
          console.log('مقال:', { id: doc.id, title: article.title, status: article.status });
          
          // Count by status
          total++;
          switch (article.status) {
            case 'under_review':
              underReview++;
              break;
            case 'edited':
              edited++;
              break;
            case 'approved':
              approved++;
              break;
            case 'rejected':
              rejected++;
              break;
          }
          
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
      setStats({ total, underReview, edited, approved, rejected });
      console.log(`تم تحميل ${articlesData.length} مقال بنجاح`);

    } catch (error) {
      console.error('خطأ في تحميل لوحة رئيس التحرير:', error);
      setError('حدث خطأ أثناء تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (articleId, newStatus, feedback = '') => {
    try {
      setError('');
      setSuccess('');

      console.log('تغيير حالة المقال:', articleId, 'إلى:', newStatus);

      const articleRef = doc(db, 'articles', articleId);
      const updateData = {
        status: newStatus,
        updatedAt: new Date(),
        editorId: currentUser.uid,
        editorName: currentUser.displayName || currentUser.email,
        editorFeedback: feedback
      };

      // Add specific fields based on status
      if (newStatus === 'edited') {
        updateData.editedAt = new Date();
      } else if (newStatus === 'approved') {
        updateData.approvedAt = new Date();
      } else if (newStatus === 'rejected') {
        updateData.rejectedAt = new Date();
      }

      await updateDoc(articleRef, updateData);

      console.log('تم تحديث حالة المقال بنجاح');
      setSuccess(`تم تحديث حالة المقال إلى: ${getStatusLabel(newStatus)}`);

      // Reload dashboard
      loadDashboard();

    } catch (error) {
      console.error('خطأ في تحديث حالة المقال:', error);
      setError('حدث خطأ أثناء تحديث حالة المقال');
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
        month: 'short',
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل لوحة رئيس التحرير...</p>
        </div>
      </div>
    );
  }

  if (error && !articles.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h3 className="text-lg font-medium">خطأ في الوصول</h3>
            <p className="text-sm mt-2">{error}</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            العودة للوحة التحكم
          </button>
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
              <h1 className="text-4xl font-bold text-gray-900">لوحة رئيس التحرير</h1>
              <p className="text-xl text-gray-600 mt-2">إدارة شاملة للمقالات والمحررين</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadDashboard}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>تحديث</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-500">إجمالي المقالات</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{stats.underReview}</div>
              <div className="text-sm text-yellow-500">قيد المراجعة</div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stats.edited}</div>
              <div className="text-sm text-blue-500">تم التحرير</div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-green-500">تمت الموافقة</div>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-red-500">مرفوض</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">إجراءات سريعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/dashboard/editor')}
              className="bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium">مراجعة المقالات</div>
            </button>
            
            <button
              onClick={() => navigate('/dashboard/write')}
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <div className="text-2xl mb-2">✍️</div>
              <div className="font-medium">كتابة مقال جديد</div>
            </button>
            
            <button
              onClick={() => navigate('/dashboard/profile')}
              className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="font-medium">الملف الشخصي</div>
            </button>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              أحدث المقالات ({articles.length})
            </h3>
          </div>
          
          {articles.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مقالات</h3>
              <p className="text-gray-500">ابدأ بإنشاء مقال جديد أو اطلب من الكتاب إرسال مقالات</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المقال
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الكاتب
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التاريخ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.slice(0, 10).map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      {/* Article Info */}
                      <td className="px-6 py-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {article.summary || 'لا يوجد ملخص'}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-400">
                              {getWordCount(article.content)} كلمة
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{article.authorName}</div>
                          <div className="text-gray-500 text-xs">{article.authorRole}</div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                          {getStatusLabel(article.status)}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(article.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => navigate(`/dashboard/view-article/${article.id}`)}
                            className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded hover:bg-indigo-50 text-xs"
                          >
                            👁️ عرض
                          </button>
                          
                          {article.status === 'under_review' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(article.id, 'edited')}
                                className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 text-xs"
                              >
                                ✏️ تم التحرير
                              </button>
                              <button
                                onClick={() => handleStatusChange(article.id, 'approved')}
                                className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 text-xs"
                              >
                                ✅ موافقة
                              </button>
                              <button
                                onClick={() => {
                                  const feedback = prompt('أدخل سبب الرفض (اختياري):');
                                  if (feedback !== null) {
                                    handleStatusChange(article.id, 'rejected', feedback);
                                  }
                                }}
                                className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50 text-xs"
                              >
                                ❌ رفض
                              </button>
                            </>
                          )}

                          {article.status === 'edited' && (
                            <button
                              onClick={() => handleStatusChange(article.id, 'approved')}
                              className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 text-xs"
                            >
                              ✅ موافقة نهائية
                            </button>
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

export default ChiefEditorDashboard; 