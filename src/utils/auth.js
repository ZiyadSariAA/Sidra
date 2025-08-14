import { auth } from '../config/firebase';
import { getUserData } from '../services/firebaseAuth';

// الحصول على المستخدم الحالي
export const getCurrentUser = () => {
  return auth.currentUser;
};

// التحقق من حالة المصادقة
export const isAuthenticated = () => {
  return !!auth.currentUser;
};

// تسجيل الخروج
export const logout = async () => {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    throw error;
  }
};

// مراقبة تغييرات حالة المصادقة
export const onAuthStateChange = (callback) => {
  return auth.onAuthStateChanged(callback);
};

// الحصول على معلومات المستخدم
export const getUserInfo = async (uid) => {
  try {
    const result = await getUserData(uid);
    return result;
  } catch (error) {
    console.error('خطأ في الحصول على معلومات المستخدم:', error);
    throw error;
  }
};

// التحقق من تحقق البريد الإلكتروني
export const isEmailVerified = (user) => {
  return user && user.emailVerified;
};

// التحقق من تحقق رقم الجوال (لم يعد مستخدماً)
export const isPhoneVerified = (user) => {
  return false; // لم يعد مستخدماً
};

// إنشاء مستخدم تجريبي للتطوير
export const createTestUser = async () => {
  try {
    // إنشاء مستخدم تجريبي في localStorage للتطوير
    const testUser = {
      uid: 'test-user-123',
      email: 'test@example.com',
      displayName: 'مستخدم تجريبي',
      role: 'writer'
    };
    localStorage.setItem('testUser', JSON.stringify(testUser));
    return { success: true, user: testUser };
  } catch (error) {
    console.error('خطأ في إنشاء المستخدم التجريبي:', error);
    throw error;
  }
};

// مسح المستخدم التجريبي
export const clearTestUser = () => {
  try {
    localStorage.removeItem('testUser');
    return { success: true };
  } catch (error) {
    console.error('خطأ في مسح المستخدم التجريبي:', error);
    throw error;
  }
};
