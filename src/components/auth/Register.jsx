import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerWithEmail } from '../../services/firebaseAuth';
import { ROLES } from '../../utils/roles';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'writer'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailExists, setEmailExists] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // التحقق من وجود الإيميل عند تغييره
    if (name === 'email' && value) {
      checkEmailExists(value);
    }
  };

  // التحقق من وجود الإيميل
  const checkEmailExists = async (email) => {
    try {
      // استخدام Firebase Auth مباشرة للتحقق من وجود الإيميل
      const { fetchSignInMethodsForEmail } = await import('firebase/auth');
      const { auth } = await import('../../config/firebase');
      
      console.log('🔍 بداية التحقق من الإيميل:', email);
      
      const methods = await fetchSignInMethodsForEmail(auth, email);
      const exists = methods.length > 0;
      
      console.log('📧 نتيجة التحقق:', { email, exists, methods, methodsLength: methods.length });
      
      setEmailExists(exists);
      
      if (exists) {
        console.log('✅ الإيميل موجود بالفعل!');
      } else {
        console.log('❌ الإيميل غير موجود');
      }
      
    } catch (error) {
      console.error('🚨 خطأ في التحقق من الإيميل:', error);
      
      // إذا كان الخطأ بسبب عدم وجود الإيميل، فهذا يعني أنه غير موجود
      if (error.code === 'auth/user-not-found') {
        setEmailExists(false);
        console.log('❌ الإيميل غير موجود (user-not-found)');
      } else {
        // أي خطأ آخر، نعتبر أن الإيميل موجود (أكثر أماناً)
        setEmailExists(true);
        console.log('⚠️ خطأ آخر، نعتبر الإيميل موجود:', error.code);
      }
    }
  };

  const validateForm = () => {
    if (emailExists) {
      setError('لا يمكن إنشاء حساب ببريد إلكتروني مسجل بالفعل! استخدم "تسجيل الدخول" بدلاً من ذلك');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('الاسم الأول والأخير مطلوبان');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role
      };
      
      console.log('بيانات المستخدم المرسلة:', userData); // للتأكد من القيم
      
      const result = await registerWithEmail(formData.email, formData.password, userData);
      
      if (result.success) {
        setSuccess('تم إنشاء الحساب بنجاح');
        setTimeout(() => {
          // Redirect based on user role
          if (result.userData?.role === 'reader') {
            navigate('/reader-dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 1500);
      }
      
    } catch (error) {
      console.error('خطأ في إنشاء الحساب:', error);
      
      // رسائل خطأ مخصصة باللغة العربية
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('البريد الإلكتروني مستخدم بالفعل! استخدم "تسجيل الدخول" بدلاً من "إنشاء حساب"');
          break;
        case 'auth/invalid-email':
          setError('البريد الإلكتروني غير صحيح');
          break;
        case 'auth/weak-password':
          setError('كلمة المرور ضعيفة جداً');
          break;
        case 'auth/operation-not-allowed':
          setError('إنشاء الحسابات غير مسموح به حالياً');
          break;
        default:
          setError('حدث خطأ في إنشاء الحساب');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أو{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              تسجيل الدخول بحساب موجود
            </Link>
          </p>
          {emailExists && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800 text-center">
                🚫 <strong>تنبيه:</strong> هذا البريد الإلكتروني مسجل بالفعل!
                <br />
                <span className="text-xs text-red-600 mt-2 block">
                  لا يمكن إنشاء حساب جديد بهذا الإيميل
                </span>
                <Link to="/login" className="font-medium text-red-700 hover:text-red-600 underline mt-2 inline-block">
                  اضغط هنا لتسجيل الدخول بدلاً من إنشاء حساب جديد
                </Link>
              </p>
            </div>
          )}
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
              {success}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  الاسم الأول
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="الاسم الأول"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  الاسم الأخير
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="الاسم الأخير"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                  emailExists 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                placeholder="أدخل بريدك الإلكتروني"
              />
              {emailExists && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
                  ⚠️ هذا البريد الإلكتروني مسجل بالفعل! 
                  <Link to="/login" className="font-medium text-red-700 hover:text-red-600 underline mr-2">
                    اضغط هنا لتسجيل الدخول
                  </Link>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                نوع الحساب
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="reader">قارئ</option>
                <option value="writer">كاتب</option>
                <option value="editor">محرر</option>
                <option value="editor-in-chief">رئيس تحرير</option>
                <option value="admin">مدير</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                الدور المحدد: <span className="font-semibold">{formData.role}</span>
              </p>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="كلمة المرور (6 أحرف على الأقل)"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                تأكيد كلمة المرور
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="أعد إدخال كلمة المرور"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
            </button>
          </div>
          
          <div className="text-center">
            <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-500">
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 