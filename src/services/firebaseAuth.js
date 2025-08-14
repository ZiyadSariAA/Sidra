import { 
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// تسجيل الخروج
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log('تم تسجيل الخروج بنجاح');
    return { success: true };
  } catch (error) {
    console.error('خطأ في تسجيل الخروج:', error);
    throw error;
  }
};

// تسجيل الخروج (اسم بديل للتوافق)
export const logout = signOut;

// مراقبة حالة المصادقة
export const onAuthStateChanged = (callback) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

// تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    throw error;
  }
};

// إنشاء حساب جديد بالبريد الإلكتروني وكلمة المرور
export const registerWithEmail = async (email, password, userData) => {
  try {
    console.log('بيانات التسجيل المستلمة:', { email, userData }); // للتأكد من البيانات
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('المستخدم المنشأ في Firebase Auth:', user); // للتأكد من إنشاء المستخدم
    
    // تحديث اسم المستخدم
    if (userData.firstName && userData.lastName) {
      await updateProfile(user, {
        displayName: `${userData.firstName} ${userData.lastName}`
      });
    }
    
    // إنشاء ملف المستخدم في Firestore
    const userDoc = {
      uid: user.uid,
      email: user.email,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      displayName: userData.firstName && userData.lastName ? `${userData.firstName} ${userData.lastName}` : '',
      role: userData.role || 'writer', // تغيير القيمة الافتراضية إلى writer
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      profileCompleted: false
    };
    
    console.log('بيانات المستخدم المحفوظة في Firestore:', userDoc); // للتأكد من القيم
    console.log('الدور المحفوظ:', userDoc.role); // للتأكد من الدور
    
    await setDoc(doc(db, 'users', user.uid), userDoc);
    
    console.log('تم حفظ المستخدم في Firestore بنجاح'); // للتأكد من الحفظ
    
    return { success: true, user };
  } catch (error) {
    console.error('خطأ في إنشاء الحساب:', error);
    throw error;
  }
};

// الحصول على بيانات المستخدم من Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'المستخدم غير موجود' };
    }
  } catch (error) {
    console.error('خطأ في الحصول على بيانات المستخدم:', error);
    throw error;
  }
};

// تحديث بيانات المستخدم
export const updateUserData = async (uid, userData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.error('خطأ في تحديث بيانات المستخدم:', error);
    throw error;
  }
}; 