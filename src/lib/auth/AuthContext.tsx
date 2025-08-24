import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';

// Your Firebase config - REAL VALUES
const firebaseConfig = {
  apiKey: "AIzaSyDzcMMeLJ1WnFy3NEAukAoRPqeOmAmyFJ4",
  authDomain: "flint-5cbda.firebaseapp.com",
  projectId: "flint-5cbda",
  storageBucket: "flint-5cbda.firebasestorage.app",
  messagingSenderId: "544564156505",
  appId: "1:544564156505:web:bb68c1f705f347eb707948",
  measurementId: "G-698GR92PX0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  token: string;
  expiresAt: number;
};

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  signOut: () => void;
  
  // Legacy methods for compatibility with existing auth flow
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string, name: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  
  isAuthModalOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  
  successMessage: string | null;
  clearSuccessMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // TODO: Move Firebase ID token to HTTP-only cookies for production security
  const STORAGE_KEY = "auth_user";

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser: AuthUser = JSON.parse(storedUser);
        // Check if token is expired
        if (parsedUser.expiresAt > Date.now()) {
          setUser(parsedUser);
        } else {
          // Token expired, clear storage
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Persist user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const clearSuccessMessage = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccessMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccessMessage]);

  // Helper to convert Firebase user object to AuthUser type
  const createAuthUser = async (firebaseUser: FirebaseUser): Promise<AuthUser> => {
    const token = await firebaseUser.getIdToken();
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1); // Firebase tokens typically expire in 1 hour
    
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      token: token,
      expiresAt: expirationTime.getTime(),
    };
  };

  // Register function
  const handleRegister = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      const authUser = await createAuthUser(userCredential.user);
      setUser(authUser);
      setIsAuthModalOpen(false);
      setSuccessMessage(`🎉 User created successfully! Welcome to Flint, ${authUser.displayName || name}!`);
      
      console.log('🎉 USER REGISTERED SUCCESSFULLY');
      
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authUser = await createAuthUser(userCredential.user);
      setUser(authUser);
      setIsAuthModalOpen(false);
      setSuccessMessage(`🔥 Login successful! Welcome back, ${authUser.displayName || 'User'}!`);
      
      console.log('🔥 USER LOGGED IN SUCCESSFULLY');
      
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      console.log('👋 USER LOGGING OUT');
      await signOut(auth);
      setUser(null);
      console.log('✅ USER LOGGED OUT SUCCESSFULLY');
    } catch (err: any) {
      setError('Failed to logout. Please try again.');
    }
  };

  // Open and close auth modal
  const openAuth = useCallback(() => {
    setIsAuthModalOpen(true);
    setError(null);
    setSuccessMessage(null);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthModalOpen(false);
    setError(null);
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = firebaseOnAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log('🔄 AUTH STATE CHANGED: User signed in');
        const authUser = await createAuthUser(firebaseUser);
        setUser(authUser);
      } else {
        console.log('🔄 AUTH STATE CHANGED: User signed out');
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    setUser,
    signOut: handleLogout,

    // Legacy methods for compatibility
    handleLogin,
    handleRegister,
    handleLogout,

    isAuthModalOpen,
    openAuth,
    closeAuth,

    isLoading,
    error,
    setError,

    successMessage,
    clearSuccessMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
