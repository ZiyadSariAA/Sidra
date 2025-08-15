import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, updateDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Message from './Message';

const Profile = () => {
  const { currentUser, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const handleLogout = () => {
    console.log('تسجيل الخروج...');
    authLogout();
    navigate('/');
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
    <div className="space-y-6">
      {/* Messages */}
      {error && (
        <Message
          type="error"
          message={error}
          onClose={() => setError('')}
          showClose={true}
        />
      )}
      
      {success && (
        <Message
          type="success"
          message={success}
          onClose={() => setSuccess('')}
          showClose={true}
        />
      )}

      {/* Profile Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50">
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الاسم المعروض *
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  required
                  value={profile.displayName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic placeholder-gray-400"
                  placeholder="أدخل اسمك المعروض"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 font-arabic cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1 font-arabic">
                  لا يمكن تغيير البريد الإلكتروني
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic placeholder-gray-400"
                  placeholder="أدخل رقم هاتفك"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                  الموقع الإلكتروني
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic placeholder-gray-400"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
                نبذة شخصية
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={profile.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] transition-all duration-300 font-arabic resize-none placeholder-gray-400"
                placeholder="اكتب نبذة مختصرة عن نفسك"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 font-arabic hover:scale-105"
              >
                <svg className="w-4 h-4 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                العودة للوحة التحكم
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 text-sm font-medium text-white bg-[#6D8751] hover:bg-[#5a6f42] rounded-xl transition-all duration-300 font-arabic shadow-sm hover:shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 inline ml-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* User Statistics */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-arabic">إحصائياتي</h2>
          <button
            onClick={refreshStats}
            className="px-4 py-2 text-sm font-medium text-[#6D8751] bg-[#6D8751]/10 hover:bg-[#6D8751]/20 rounded-xl transition-all duration-300 font-arabic hover:scale-105"
          >
            <svg className="w-4 h-4 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            تحديث
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900">{stats.totalArticles}</div>
            <div className="text-sm text-gray-600 font-arabic">إجمالي المقالات</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{stats.publishedArticles}</div>
            <div className="text-sm text-green-600 font-arabic">المنشورة</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{stats.approvedArticles}</div>
            <div className="text-sm text-blue-600 font-arabic">الموافق عليها</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-2xl font-bold text-yellow-600">{stats.underReviewArticles}</div>
            <div className="text-sm text-yellow-600 font-arabic">قيد المراجعة</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-600">{stats.draftArticles}</div>
            <div className="text-sm text-gray-600 font-arabic">المسودات</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl">
            <div className="text-2xl font-bold text-red-600">{stats.rejectedArticles}</div>
            <div className="text-sm text-red-600 font-arabic">المرفوضة</div>
          </div>
        </div>
      </div>

      {/* Logout Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium text-gray-900 font-arabic">تسجيل الخروج</h3>
          <p className="text-sm text-gray-600 font-arabic">
            عند تسجيل الخروج، ستتم إعادة توجيهك إلى الصفحة الرئيسية
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 font-arabic shadow-sm hover:shadow-md hover:scale-105"
          >
            <svg className="w-4 h-4 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 