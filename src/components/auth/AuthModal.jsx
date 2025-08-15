import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerWithEmail, loginWithEmail, checkEmailExists } from '../../services/firebaseAuth';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState('email'); // email, login, register
  const [email, setEmail] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  
  const [loginData, setLoginData] = useState({
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: 'reader'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkEmail = async (emailToCheck) => {
    try {
      setLoading(true);
      setError('');
      const result = await checkEmailExists(emailToCheck);
      console.log('نتيجة التحقق من الإيميل:', result);
      return result.exists;
    } catch (error) {
      console.error('خطأ في التحقق من الإيميل:', error);
      setError('حدث خطأ في التحقق من الإيميل');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      // Normalize email before checking
      const normalizedEmail = email.trim().toLowerCase();
      
      console.log('=== بداية معالجة الإيميل ===');
      console.log('الإيميل المدخل:', email);
      console.log('الإيميل المعالج:', normalizedEmail);
      console.log('جاري التحقق من الإيميل...');
      
      const result = await checkEmailExists(normalizedEmail);
      console.log('نتيجة التحقق من الإيميل:', result);
      console.log('الإيميل موجود:', result.exists);
      console.log('الطرق المتاحة:', result.methods);
      
      if (result.exists) {
        console.log('الإيميل موجود، الانتقال لتسجيل الدخول');
        setStep('login');
      } else {
        console.log('الإيميل غير موجود، الانتقال لإنشاء حساب');
        setStep('register');
      }
      
      console.log('=== نهاية معالجة الإيميل ===');
    } catch (error) {
      console.error('=== خطأ في معالجة الإيميل ===');
      console.error('الخطأ:', error);
      console.error('تفاصيل الخطأ:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      console.error('=== نهاية الخطأ ===');
      setError('حدث خطأ في التحقق من الإيميل');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateRegisterForm = () => {
    if (registerData.password !== registerData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return false;
    }
    
    if (registerData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }
    
    if (!registerData.firstName.trim() || !registerData.lastName.trim()) {
      setError('الاسم الأول والأخير مطلوبان');
      return false;
    }
    
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await loginWithEmail(email, loginData.password);
      if (result.success) {
        setSuccess('تم تسجيل الدخول بنجاح');
        setTimeout(() => {
          onClose();
          setStep('email');
          setEmail('');
          setLoginData({ password: '' });
          setRegisterData({
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            role: 'reader'
          });
        }, 1500);
      }
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      
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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const userData = {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        role: registerData.role
      };
      
      const result = await registerWithEmail(email, registerData.password, userData);
      
      if (result.success) {
        setSuccess('تم إنشاء الحساب بنجاح');
        setTimeout(() => {
          onClose();
          setStep('email');
          setEmail('');
          setLoginData({ password: '' });
          setRegisterData({
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            role: 'reader'
          });
        }, 1500);
      }
      
    } catch (error) {
      console.error('خطأ في إنشاء الحساب:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('البريد الإلكتروني مستخدم بالفعل');
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

  const resetToEmail = () => {
    setStep('email');
    setError('');
    setSuccess('');
    setEmail('');
    setEmailExists(false);
    setLoginData({ password: '' });
    setRegisterData({
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      role: 'reader'
    });
  };

  const renderEmailStep = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">سِدره</h1>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          أيش بريدك؟
        </h2>
        <p className="text-gray-600 text-base">
          أنشئ حساباً أو سجل دخولك بحسابك المسجل في سِدره
        </p>
      </div>
      
      <form onSubmit={handleEmailSubmit} className="space-y-6">
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pr-10 pl-4 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] text-lg"
              placeholder="ahlan@sidra.com"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !email || !email.includes('@')}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg text-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'جاري التحقق...' : 'متابعة'}
        </button>
      </form>
    </div>
  );

  const renderLoginStep = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">سِدره</h1>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          مرحباً بك مرة أخرى!
        </h2>
        <p className="text-gray-600 text-base">
          أدخل كلمة المرور للمتابعة
        </p>
        <p className="text-gray-500 text-sm mt-2 bg-gray-100 px-3 py-2 rounded-lg inline-block">
          {email}
        </p>
      </div>
      
      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            كلمة المرور
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={loginData.password}
            onChange={handleLoginChange}
            className="block w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] text-lg"
            placeholder="أدخل كلمة المرور"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg text-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>
      
      <button
        onClick={resetToEmail}
        className="w-full text-gray-600 hover:text-gray-800 text-base py-3 transition-colors"
      >
        استخدام بريد إلكتروني آخر
      </button>
    </div>
  );

  const renderRegisterStep = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">سِدره</h1>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          مرحباً بك!
        </h2>
        <p className="text-gray-600 text-base">
          أكمل بياناتك لإنشاء الحساب
        </p>
        <p className="text-gray-500 text-sm mt-2 bg-gray-100 px-3 py-2 rounded-lg inline-block">
          {email}
        </p>
      </div>
      
      <form onSubmit={handleRegisterSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              الاسم الأول
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={registerData.firstName}
              onChange={handleRegisterChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751]"
              placeholder="الاسم الأول"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              الاسم الأخير
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={registerData.lastName}
              onChange={handleRegisterChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751]"
              placeholder="الاسم الأخير"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            نوع الحساب
          </label>
          <select
            id="role"
            name="role"
            value={registerData.role}
            onChange={handleRegisterChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751]"
          >
            <option value="reader">قارئ</option>
            <option value="writer">كاتب</option>
            <option value="editor">محرر</option>
            <option value="editor-in-chief">رئيس تحرير</option>
            <option value="admin">مدير</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            كلمة المرور
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={registerData.password}
            onChange={handleRegisterChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751]"
            placeholder="كلمة المرور (6 أحرف على الأقل)"
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            تأكيد كلمة المرور
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751]"
            placeholder="أعد إدخال كلمة المرور"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg text-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
        </button>
      </form>
      
      <button
        onClick={resetToEmail}
        className="w-full text-gray-600 hover:text-gray-800 text-base py-3 transition-colors"
      >
        استخدام بريد إلكتروني آخر
      </button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="text-right p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="px-8 pb-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">
              {success}
            </div>
          )}
          
          {step === 'email' && renderEmailStep()}
          {step === 'login' && renderLoginStep()}
          {step === 'register' && renderRegisterStep()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
