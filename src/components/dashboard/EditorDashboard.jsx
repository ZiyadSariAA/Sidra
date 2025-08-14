import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Added useNavigate import

const EditorDashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('under_review');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (currentUser) {
      // Check if user has editor role
      if (currentUser.role !== 'editor' && currentUser.role !== 'editor-in-chief') {
        setError('ليس لديك صلاحية للوصول لهذه الصفحة. الدور المطلوب: محرر أو رئيس تحرير');
        setLoading(false);
        return;
      }
      
      loadArticles();
    }
  }, [currentUser, filter]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('جاري تحميل المقالات للمراجعة...');

      const articlesRef = collection(db, 'articles');
      
      // Query articles based on filter - remove orderBy to avoid index issues
      let q;
      if (filter === 'all') {
        q = query(
          articlesRef,
          where('status', 'in', ['under_review', 'edited', 'approved', 'rejected'])
        );
      } else {
        q = query(
          articlesRef,
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
          console.log('مقال:', { id: doc.id, title: article.title, status: article.status });
          
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

      // Sort articles manually after fetching (newest first)
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
      } else if (error.message) {
        userMessage = `خطأ: ${error.message}`;
      }
      
      setError(userMessage);
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

      // Reload articles
      loadArticles();

    } catch (error) {
      console.error('خطأ في تحديث حالة المقال:', error);
      setError('حدث خطأ أثناء تحديث حالة المقال');
    }
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      'under_review': 'قيد المراجعة',
      'edited': 'تم التحرير',
      'approved': 'تمت الموافقة',
      'rejected': 'مرفوض'
    };
    return statusLabels[status] || status;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'under_review': 'bg-yellow-100 text-yellow-800',
      'edited': 'bg-blue-100 text-blue-800',
      'approved': 'bg-green-100 text-green-800',
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل المقالات...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">لوحة المحرر</h1>
              <p className="text-gray-600 mt-2">مراجعة وتحرير المقالات المرسلة من الكتاب</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadArticles}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>تحديث</span>
              </button>
              
              {/* Test Connection Button */}
              <button
                onClick={async () => {
                  try {
                    setError('');
                    setSuccess('');
                    console.log('اختبار الاتصال بـ Firestore...');
                    
                    const testRef = collection(db, 'articles');
                    const testQuery = query(testRef, where('status', '==', 'draft'));
                    const testSnapshot = await getDocs(testQuery);
                    
                    console.log('اختبار الاتصال نجح! عدد المقالات:', testSnapshot.size);
                    setSuccess(`اختبار الاتصال نجح! عدد المقالات في قاعدة البيانات: ${testSnapshot.size}`);
                    
                  } catch (error) {
                    console.error('اختبار الاتصال فشل:', error);
                    setError(`اختبار الاتصال فشل: ${error.message}`);
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
              >
                <span>🔌</span>
                <span>اختبار الاتصال</span>
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

        {/* Role Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-blue-600 text-lg">ℹ️</span>
            </div>
            <div className="mr-3">
              <h4 className="text-sm font-medium text-blue-800">
                {currentUser.role === 'editor-in-chief' ? 'رئيس التحرير' : 'محرر'}
              </h4>
              <p className="text-sm text-blue-700">
                {currentUser.role === 'editor-in-chief' 
                  ? 'يمكنك مراجعة المقالات، تحريرها، الموافقة عليها، أو رفضها'
                  : 'يمكنك مراجعة المقالات، تحريرها، أو رفضها. الموافقة النهائية من رئيس التحرير فقط'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Debug Info - Remove this later */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">معلومات التصحيح (Development)</h4>
            <div className="text-xs text-yellow-700 space-y-1">
              <p>المستخدم الحالي: {currentUser?.email}</p>
              <p>دور المستخدم: {currentUser?.role}</p>
              <p>معرف المستخدم: {currentUser?.uid}</p>
              <p>الفلتر المحدد: {filter}</p>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">تصفية حسب الحالة:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="under_review">قيد المراجعة</option>
                <option value="edited">تم التحرير</option>
                <option value="approved">تمت الموافقة</option>
                <option value="rejected">مرفوض</option>
                <option value="all">جميع الحالات</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              المقالات ({articles.length})
            </h3>
          </div>
          
          {articles.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مقالات</h3>
              <p className="text-gray-500 mb-4">
                {filter === 'all' 
                  ? 'لا توجد مقالات في أي من الحالات المحددة'
                  : `لا توجد مقالات بحالة "${getStatusLabel(filter)}"`
                }
              </p>
              <div className="text-sm text-gray-400">
                <p>تأكد من:</p>
                <ul className="mt-2 space-y-1">
                  <li>• وجود مقالات مرسلة للمراجعة من الكتاب</li>
                  <li>• أن المقالات لديها الحالة المطلوبة</li>
                  <li>• أن لديك صلاحيات الوصول للمقالات</li>
                </ul>
              </div>
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
                      التصنيف
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
                  {articles.map((article) => (
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
                            {article.tags && article.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {article.tags.slice(0, 3).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {article.tags.length > 3 && (
                                  <span className="text-xs text-gray-400">
                                    +{article.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
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

                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {article.category || 'عام'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                          {getStatusLabel(article.status)}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div>إنشاء: {formatDate(article.createdAt)}</div>
                          {article.updatedAt && article.updatedAt !== article.createdAt && (
                            <div className="text-xs text-gray-400">
                              تحديث: {formatDate(article.updatedAt)}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col space-y-2">
                          {/* View Article Button */}
                          <button
                            onClick={() => {
                              // Navigate to view article page
                              console.log('عرض المقال:', article.id);
                              navigate(`/dashboard/view-article/${article.id}`);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded hover:bg-indigo-50 text-xs"
                          >
                            👁️ عرض
                          </button>

                          {/* Status Change Buttons */}
                          {article.status === 'under_review' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(article.id, 'edited')}
                                className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 text-xs"
                              >
                                ✏️ تم التحرير
                              </button>
                               
                               {/* Only Editor-in-Chief can approve */}
                               {currentUser.role === 'editor-in-chief' && (
                                 <button
                                   onClick={() => handleStatusChange(article.id, 'approved')}
                                   className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 text-xs"
                                 >
                                   ✅ موافقة
                                 </button>
                               )}
                               
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
                             <>
                               {/* Only Editor-in-Chief can give final approval */}
                               {currentUser.role === 'editor-in-chief' ? (
                                 <button
                                   onClick={() => handleStatusChange(article.id, 'approved')}
                                   className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50 text-xs"
                                 >
                                   ✅ موافقة نهائية
                                 </button>
                               ) : (
                                 <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                                   ⏳ في انتظار موافقة رئيس التحرير
                                 </div>
                               )}
                             </>
                           )}

                          {/* Show feedback if exists */}
                          {article.editorFeedback && (
                            <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded">
                              <strong>ملاحظات:</strong> {article.editorFeedback}
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

export default EditorDashboard; 