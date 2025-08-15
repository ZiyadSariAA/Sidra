import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, getUserData, signOut } from '../services/firebaseAuth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // تحميل بيانات المستخدم مع إعادة المحاولة
  const loadUserProfile = useCallback(async (uid, retryCount = 0) => {
    try {
      console.log('Loading user profile for UID:', uid, 'retry:', retryCount);
      const result = await getUserData(uid);
      console.log('getUserData result:', result);
      
      if (result.success) {
        console.log('Setting userProfile:', result.data);
        setUserProfile(result.data);
        setLoading(false);
      } else {
        console.error('Failed to load user profile:', result.error);
        // إعادة المحاولة مرة واحدة
        if (retryCount < 1) {
          setTimeout(() => loadUserProfile(uid, retryCount + 1), 1000);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('خطأ في تحميل بيانات المستخدم:', error);
      // إعادة المحاولة مرة واحدة
      if (retryCount < 1) {
        setTimeout(() => loadUserProfile(uid, retryCount + 1), 1000);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    console.log('AuthProvider mounted, setting up auth listener');
    
    const unsubscribe = onAuthStateChanged((user) => {
      console.log('AuthStateChanged - user:', user);
      
      if (user) {
        setCurrentUser(user);
        // تحميل بيانات المستخدم من Firestore
        loadUserProfile(user.uid);
      } else {
        console.log('No user, clearing state');
        setCurrentUser(null);
        setUserProfile(null);
        setLoading(false);
      }
      
      if (!isInitialized) {
        setIsInitialized(true);
      }
    });

    // تنظيف عند إلغاء الاشتراك
    return () => {
      console.log('AuthProvider unmounting, cleaning up');
      unsubscribe();
    };
  }, [loadUserProfile, isInitialized]);

  // منع إعادة التحميل غير الضرورية
  const isAuthenticated = !!currentUser;

  // دالة تسجيل الخروج
  const logout = useCallback(async () => {
    try {
      await signOut();
      setCurrentUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('خطأ في تسجيل الخروج:', error);
    }
  }, []);

  const value = {
    user: currentUser,
    userData: userProfile,
    currentUser,
    userProfile,
    loading: loading || !isInitialized,
    isAuthenticated,
    loadUserProfile,
    isInitialized,
    logout
  };

  console.log('AuthContext value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 