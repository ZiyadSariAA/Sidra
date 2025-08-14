import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, updateDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    underReviewArticles: 0,
    approvedArticles: 0,
    rejectedArticles: 0
  });
  
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    role: '',
    bio: '',
    website: '',
    phone: ''
  });

  useEffect(() => {
    if (currentUser) {
      setProfile({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        role: currentUser.role || '',
        bio: currentUser.bio || '',
        website: currentUser.website || '',
        phone: currentUser.phone || ''
      });
      
      // Load real user stats
      loadUserStats();
    }
  }, [currentUser]);

  // Add refresh function
  const refreshStats = () => {
    console.log('تحديث الإحصائيات...');
    loadUserStats();
  };

  const loadUserStats = async () => {
    try {
      if (!currentUser) return;

      console.log('جاري تحميل إحصائيات المستخدم...');
      console.log('معرف المستخدم:', currentUser.uid);
      
      // Query articles by author (without orderBy to avoid index issues)
      const articlesRef = collection(db, 'articles');
      const q = query(
        articlesRef, 
        where('authorId', '==', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(q);
      
      let totalArticles = 0;
      let publishedArticles = 0;
      let draftArticles = 0;
      let underReviewArticles = 0;
      let approvedArticles = 0;
      let rejectedArticles = 0;

      console.log('عدد المقالات الموجودة:', querySnapshot.size);

      querySnapshot.forEach((doc) => {
        try {
          const article = doc.data();
          console.log('مقال:', { id: doc.id, title: article.title, status: article.status, authorId: article.authorId });
          totalArticles++;
          
          switch (article.status) {
            case 'published':
              publishedArticles++;
              break;
            case 'draft':
              draftArticles++;
              break;
            case 'under_review':
              underReviewArticles++;
              break;
            case 'approved':
              approvedArticles++;
              break;
            case 'rejected':
              rejectedArticles++;
              break;
            default:
              draftArticles++; // Default to draft
          }
        } catch (docError) {
          console.error('خطأ في معالجة مقال:', doc.id, docError);
        }
      });

      const newStats = {
        totalArticles,
        publishedArticles,
        draftArticles,
        underReviewArticles,
        approvedArticles,
        rejectedArticles
      };

      setStats(newStats);

      console.log('تم تحميل الإحصائيات:', newStats);

    } catch (error) {
      console.error('خطأ في تحميل الإحصائيات:', error);
      console.error('تفاصيل الخطأ:', error.message);
      console.error('نوع الخطأ:', error.code);
      
      // Keep default stats if there's an error
      let userMessage = 'حدث خطأ أثناء تحميل الإحصائيات';
      
      if (error.code === 'permission-denied') {
        userMessage = 'ليس لديك صلاحية لعرض المقالات';
      } else if (error.code === 'unavailable') {
        userMessage = 'Firebase غير متاح - يرجى التحقق من الاتصال';
      } else {
        userMessage = `خطأ: ${error.message}`;
      }
      
      console.error('رسالة الخطأ للمستخدم:', userMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
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

      // Update profile in Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        displayName: profile.displayName,
        bio: profile.bio,
        website: profile.website,
        phone: profile.phone,
        updatedAt: new Date()
      });
      
      console.log('تم تحديث الملف الشخصي بنجاح');
      setSuccess('تم تحديث الملف الشخصي بنجاح!');
      
    } catch (error) {
      console.error('خطأ في تحديث الملف الشخصي:', error);
      setError(error.message || 'حدث خطأ أثناء تحديث الملف الشخصي');
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'writer':
        return 'كاتب';
      case 'editor':
        return 'محرر';
      case 'editor-in-chief':
        return 'رئيس التحرير';
      default:
        return 'مستخدم';
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'writer':
        return 'يمكنك كتابة المقالات وإرسالها للمراجعة';
      case 'editor':
        return 'يمكنك مراجعة وتحرير المقالات المقدمة من الكتاب';
      case 'editor-in-chief':
        return 'يمكنك الموافقة على نشر المقالات وإدارتها';
      default:
        return 'لا توجد صلاحيات محددة';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-green-600';
      case 'approved':
        return 'text-blue-600';
      case 'under_review':
        return 'text-yellow-600';
      case 'draft':
        return 'text-gray-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
              <p className="text-gray-600 mt-2">إدارة معلوماتك الشخصية</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              العودة للوحة التحكم
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-8">
                <h3 className="text-lg font-medium text-gray-900 mb-6">المعلومات الشخصية</h3>
                
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

                  {/* Display Name */}
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      required
                      value={profile.displayName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">لا يمكن تغيير البريد الإلكتروني</p>
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      الدور في النظام
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={getRoleDisplayName(profile.role)}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">{getRoleDescription(profile.role)}</p>
                  </div>

                  {/* Bio */}
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                      نبذة شخصية
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      value={profile.bio}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="اكتب نبذة مختصرة عن نفسك..."
                    />
                  </div>

                  {/* Website and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                        الموقع الإلكتروني
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={profile.website}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">إحصائياتي</h3>
                <button
                  onClick={refreshStats}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  🔄 تحديث
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">إجمالي المقالات</span>
                  <span className="text-2xl font-bold text-indigo-600">{stats.totalArticles}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">المقالات المنشورة</span>
                  <span className="text-xl font-semibold text-green-600">{stats.publishedArticles}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الموافق عليها</span>
                  <span className="text-xl font-semibold text-blue-600">{stats.approvedArticles}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">قيد المراجعة</span>
                  <span className="text-xl font-semibold text-yellow-600">{stats.underReviewArticles}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">المقالات المسودة</span>
                  <span className="text-xl font-semibold text-gray-600">{stats.draftArticles}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">المرفوضة</span>
                  <span className="text-xl font-semibold text-red-600">{stats.rejectedArticles}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">إجراءات سريعة</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate('/dashboard/write')}
                    className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
                  >
                    ✍️ كتابة مقال جديد
                  </button>
                  
                  <button
                    onClick={() => navigate('/dashboard/my-articles')}
                    className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md"
                  >
                    📰 مقالاتي ({stats.totalArticles})
                  </button>
                  
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                    📊 العودة للوحة التحكم
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 