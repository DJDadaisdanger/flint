import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, LogOut, Edit, Save, X } from 'lucide-react';
import { useNavigation } from './NavigationContext';
import { useAuth } from '../../lib/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { goBack } = useNavigation();
  const { user, setUser, signOut } = useAuth();
  const navigate = useNavigate();
  
  // User profile state - initialize from authenticated user
  const [userInfo, setUserInfo] = useState({
    name: user?.displayName ?? '',
    email: user?.email ?? ''
  });
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  // Update userInfo when user changes
  useEffect(() => {
    const newUserInfo = {
      name: user?.displayName ?? '',
      email: user?.email ?? ''
    };
    setUserInfo(newUserInfo);
    setTempUserInfo(newUserInfo);
  }, [user]);
  
  // Password state
  const [showPassword, setShowPassword] = useState(false);
  const [password] = useState('••••••••');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    setUserInfo(tempUserInfo);
    if (user) {
      setUser({ ...user, displayName: tempUserInfo.name, email: tempUserInfo.email });
    }
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setTempUserInfo({ name: user?.displayName ?? '', email: user?.email ?? '' });
    setIsEditingProfile(false);
  };

  const handleResetPassword = () => {
    // Validate passwords match
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    // Here you would typically make an API call to reset the password
    console.log('Password reset requested');
    setShowResetPassword(false);
    setResetPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Password reset successfully!');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate even if there's an error
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background-dark p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <button
            onClick={goBack}
            className="p-2 rounded-lg bg-background-medium hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 hover:scale-110 flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          
          <div>
            <h1 className="text-2xl text-white" style={{ fontWeight: 500 }}>Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Information Card */}
          <div className="bg-background-medium rounded-2xl p-6 border border-primary-accent/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white" style={{ fontWeight: 400 }}>Profile Information</h2>
              {!isEditingProfile ? (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="p-2 rounded-lg bg-background-dark hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 hover:scale-110"
                  aria-label="Edit profile"
                >
                  <Edit className="w-4 h-4" strokeWidth={2} />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="p-2 rounded-lg bg-primary-accent hover:bg-bright-accent text-background-dark transition-all duration-200 hover:scale-110"
                    aria-label="Save changes"
                  >
                    <Save className="w-4 h-4" strokeWidth={2} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-2 rounded-lg bg-background-dark hover:bg-muted-foreground/20 text-white hover:text-muted-foreground transition-all duration-200 hover:scale-110"
                    aria-label="Cancel edit"
                  >
                    <X className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white" style={{ fontWeight: 400 }}>
                  <User className="w-4 h-4 text-primary-accent" strokeWidth={2} />
                  Full Name
                </label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={tempUserInfo.name}
                    onChange={(e) => setTempUserInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-background-dark text-white border border-background-dark rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all duration-200"
                    style={{ fontWeight: 400 }}
                  />
                ) : (
                  <div className="bg-background-dark rounded-lg p-3 text-white" style={{ fontWeight: 400 }}>
                    {userInfo.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white" style={{ fontWeight: 400 }}>
                  <Mail className="w-4 h-4 text-primary-accent" strokeWidth={2} />
                  Email Address
                </label>
                {isEditingProfile ? (
                  <input
                    type="email"
                    value={tempUserInfo.email}
                    onChange={(e) => setTempUserInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-background-dark text-white border border-background-dark rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all duration-200"
                    style={{ fontWeight: 400 }}
                  />
                ) : (
                  <div className="bg-background-dark rounded-lg p-3 text-white" style={{ fontWeight: 400 }}>
                    {userInfo.email}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Password Security Card */}
          <div className="bg-background-medium rounded-2xl p-6 border border-primary-accent/10">
            <h2 className="text-xl text-white mb-6" style={{ fontWeight: 400 }}>Security</h2>
            
            <div className="space-y-4">
              {/* Current Password Display */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white" style={{ fontWeight: 400 }}>
                  <Lock className="w-4 h-4 text-primary-accent" strokeWidth={2} />
                  Password
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-background-dark rounded-lg p-3 text-white flex items-center justify-between" style={{ fontWeight: 400 }}>
                    <span>{showPassword ? 'your_password_here' : password}</span>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-primary-accent transition-colors duration-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={2} /> : <Eye className="w-4 h-4" strokeWidth={2} />}
                    </button>
                  </div>
                  <button
                    onClick={() => setShowResetPassword(true)}
                    className="px-4 py-3 bg-primary-accent hover:bg-bright-accent text-background-dark rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ fontWeight: 400 }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reset Password Modal */}
          {showResetPassword && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 bg-background-dark/80 backdrop-blur-md z-[60]" />
              
              {/* Modal */}
              <div className="fixed inset-0 flex items-center justify-center p-4 z-[70]">
                <div className="w-full max-w-md bg-background-medium border border-primary-accent/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg text-white" style={{ fontWeight: 400 }}>Reset Password</h3>
                    <button
                      onClick={() => setShowResetPassword(false)}
                      className="p-1 rounded-lg text-muted-foreground hover:text-white transition-colors duration-200"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2" style={{ fontWeight: 400 }}>Current Password</label>
                      <input
                        type="password"
                        value={resetPasswordData.currentPassword}
                        onChange={(e) => setResetPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full bg-background-dark text-white border border-background-dark rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all duration-200"
                        style={{ fontWeight: 400 }}
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2" style={{ fontWeight: 400 }}>New Password</label>
                      <input
                        type="password"
                        value={resetPasswordData.newPassword}
                        onChange={(e) => setResetPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full bg-background-dark text-white border border-background-dark rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all duration-200"
                        style={{ fontWeight: 400 }}
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2" style={{ fontWeight: 400 }}>Confirm New Password</label>
                      <input
                        type="password"
                        value={resetPasswordData.confirmPassword}
                        onChange={(e) => setResetPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full bg-background-dark text-white border border-background-dark rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all duration-200"
                        style={{ fontWeight: 400 }}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleResetPassword}
                        className="flex-1 bg-primary-accent hover:bg-bright-accent text-background-dark py-3 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ fontWeight: 400 }}
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => setShowResetPassword(false)}
                        className="flex-1 bg-background-dark hover:bg-muted-foreground/20 text-white py-3 rounded-lg transition-all duration-200 hover:scale-105"
                        style={{ fontWeight: 400 }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Actions Card */}
          <div className="bg-background-medium rounded-2xl p-6 border border-primary-accent/10">
            <h2 className="text-xl text-white mb-6" style={{ fontWeight: 400 }}>Account Actions</h2>
            
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto text-white flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
              style={{ fontWeight: 400, backgroundColor: 'oklch(0.5 0.37 20)' }}
            >
              <LogOut className="w-5 h-5 text-white" strokeWidth={2} />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}