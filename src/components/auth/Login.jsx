import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithEmail } from '../../services/firebaseAuth';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
      const result = await loginWithEmail(formData.email, formData.password);
      if (result.success) {
        setSuccess('تم تسجيل الدخول بنجاح');
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
      console.error('خطأ في تسجيل الدخول:', error);
      
      // رسائل خطأ مخصصة باللغة العربية
      switch (error.code) {
        case 'auth/user-not-found':
          setError('البريد الإلكتروني غير مسجل');
          break;
        case 'auth/wrong-password':
          setError('كلمة المرور غير صحيحة');
          break;
        case 'auth/invalid-email':
          setError('البريد الإلكتروني غير صحيح');
          break;
        case 'auth/user-disabled':
          setError('تم تعطيل هذا الحساب');
          break;
        case 'auth/too-many-requests':
          setError('تم تجاوز الحد الأقصى للمحاولات، حاول لاحقاً');
          break;
        default:
          setError('حدث خطأ في تسجيل الدخول');
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
            تسجيل الدخول
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أو{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              إنشاء حساب جديد
            </Link>
          </p>
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
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="أدخل كلمة المرور"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
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

export default Login; 