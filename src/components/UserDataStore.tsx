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

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;

  handleLogin(email: string, password: string): Promise<void>;
  handleRegister(email: string, password: string, name: string): Promise<void>;
  handleLogout(): Promise<void>;

  isAuthModalOpen: boolean;
  openAuth(): void;
  closeAuth(): void;

  isLoading: boolean;
  error: string | null;
  setError(error: string | null): void;

  successMessage: string | null;
  clearSuccessMessage(): void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  // Helper to convert Firebase user object to your User type
  const createUserData = (firebaseUser: FirebaseUser): User => {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || 'User',
      createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
      lastLogin: firebaseUser.metadata.lastSignInTime || new Date().toISOString(),
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
      const userData = createUserData(userCredential.user);
      setUser(userData);
      setIsAuthModalOpen(false);
      setSuccessMessage(`🎉 User created successfully! Welcome to Flint, ${userData.name}!`);
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
      const userData = createUserData(userCredential.user);
      setUser(userData);
      setIsAuthModalOpen(false);
      setSuccessMessage(`🔥 Login successful! Welcome back, ${userData.name}!`);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
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
    const unsubscribe = firebaseOnAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = createUserData(firebaseUser);
        setUser(userData);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,

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
