import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged, getUserData } from '../services/firebaseAuth';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      console.log('AuthStateChanged - user:', user);
      setCurrentUser(user);
      
      if (user) {
        // تحميل بيانات المستخدم من Firestore
        loadUserProfile(user.uid);
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const loadUserProfile = async (uid) => {
    try {
      console.log('Loading user profile for UID:', uid);
      const result = await getUserData(uid);
      console.log('getUserData result:', result);
      
      if (result.success) {
        console.log('Setting userProfile:', result.data);
        setUserProfile(result.data);
      } else {
        console.error('Failed to load user profile:', result.error);
      }
    } catch (error) {
      console.error('خطأ في تحميل بيانات المستخدم:', error);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!currentUser;

  const value = {
    currentUser,
    userProfile,
    loading,
    isAuthenticated,
    loadUserProfile
  };

  console.log('AuthContext value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 