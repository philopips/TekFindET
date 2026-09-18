import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  const signInWithEmail = async (email: string, pass: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
    } catch (err: any) {
      console.error('Sign in error:', err);
      let msg = err?.message || 'Failed to sign in';
      if (err?.code === 'auth/user-not-found' || err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password. Please verify your credentials.';
      } else if (err?.code === 'auth/too-many-requests') {
        msg = 'Too many failed login attempts. Please wait a few moments and try again.';
      }
      setError(msg);
      throw new Error(msg);
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), pass);
    } catch (err: any) {
      console.error('Sign up error:', err);
      let msg = err?.message || 'Failed to create admin account';
      if (err?.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists. Try signing in instead.';
      } else if (err?.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      setError(msg);
      throw new Error(msg);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google sign in error:', err);
      let msg = err?.message || 'Failed to authenticate with Google';
      if (err?.code === 'auth/popup-closed-by-user') {
        msg = 'Google sign-in popup was closed before completing.';
      }
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err?.message || 'Failed to sign out');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
