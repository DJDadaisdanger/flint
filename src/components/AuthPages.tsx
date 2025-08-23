import React, { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';
import { useAuth } from './UserDataStore';

interface AuthPagesProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * FIREBASE AUTHENTICATION MODAL
 * 
 * Updated to work with Firebase authentication:
 * - Removed demo credentials (now using real Firebase auth)
 * - Improved form validation for better user experience
 * - Integrated with Firebase success/error handling
 * - Clean, modern Flint-themed design with electric accents
 */

export function AuthPages({ isOpen, onClose }: AuthPagesProps) {
  const { handleLogin, handleRegister, isLoading, error, setError } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Clear form and errors when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', password: '', name: '', confirmPassword: '' });
      setValidationErrors({});
      setError(null);
    }
  }, [isOpen, isLoginMode, setError]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Registration-specific validation
    if (!isLoginMode) {
      if (!formData.name.trim()) {
        errors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    if (isLoginMode) {
      await handleLogin(formData.email, formData.password);
    } else {
      await handleRegister(formData.email, formData.password, formData.name.trim());
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Clear global error when user starts typing
    if (error) setError(null);
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setValidationErrors({});
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-flint-dark border border-flint-darker rounded-lg max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dark-cyan-300 hover:text-flint-accent-bright transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-flint-accent to-flint-accent-bright rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-flint-black" />
          </div>
          <h2 className="text-2xl font-semibold text-dark-cyan-100 mb-2">
            {isLoginMode ? 'Welcome Back' : 'Join Flint'}
          </h2>
          <p className="text-dark-cyan-300">
            {isLoginMode ? 'Sign in to continue your journey' : 'Start your creative journey today'}
          </p>
        </div>
        
        {/* Global Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field (registration only) */}
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-dark-cyan-200 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 bg-flint-darker border rounded-lg text-dark-cyan-100 placeholder-dark-cyan-400 focus:outline-none focus:ring-2 transition-colors ${
                  validationErrors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-flint-darker focus:ring-flint-accent'
                }`}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
              {validationErrors.name && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.name}</p>
              )}
            </div>
          )}
          
          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-dark-cyan-200 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 bg-flint-darker border rounded-lg text-dark-cyan-100 placeholder-dark-cyan-400 focus:outline-none focus:ring-2 transition-colors ${
                validationErrors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-flint-darker focus:ring-flint-accent'
              }`}
              placeholder="Enter your email address"
              disabled={isLoading}
            />
            {validationErrors.email && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>
          
          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-dark-cyan-200 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full px-3 py-2 bg-flint-darker border rounded-lg text-dark-cyan-100 placeholder-dark-cyan-400 focus:outline-none focus:ring-2 transition-colors ${
                validationErrors.password ? 'border-red-500 focus:ring-red-500/50' : 'border-flint-darker focus:ring-flint-accent'
              }`}
              placeholder={isLoginMode ? 'Enter your password' : 'Create a password'}
              disabled={isLoading}
            />
            {validationErrors.password && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.password}</p>
            )}
          </div>
          
          {/* Confirm Password field (registration only) */}
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-dark-cyan-200 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full px-3 py-2 bg-flint-darker border rounded-lg text-dark-cyan-100 placeholder-dark-cyan-400 focus:outline-none focus:ring-2 transition-colors ${
                  validationErrors.confirmPassword ? 'border-red-500 focus:ring-red-500/50' : 'border-flint-darker focus:ring-flint-accent'
                }`}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              {validationErrors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.confirmPassword}</p>
              )}
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-flint-accent to-flint-accent-bright text-flint-black font-semibold rounded-lg hover:shadow-lg hover:shadow-flint-accent/25 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-flint-black/30 border-t-flint-black rounded-full animate-spin" />
                Please wait...
              </div>
            ) : (
              isLoginMode ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>
        
        {/* Mode Switch */}
        <div className="mt-6 text-center">
          <button
            onClick={switchMode}
            className="text-flint-accent hover:text-flint-accent-bright transition-colors text-sm"
            disabled={isLoading}
          >
            {isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}