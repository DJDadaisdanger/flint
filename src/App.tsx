import { AuthProvider } from './components/UserDataStore';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureCards } from './components/FeatureCards';
import { Footer } from './components/Footer';
import { AuthPages } from './components/AuthPages';
import { SuccessDialog } from './components/SuccessDialog';
import { useAuth } from './components/UserDataStore';

/**
 * BACKEND INTEGRATION NOTES:
 * 
 * Main App Component - Firebase Authentication System
 * 
 * Key Changes:
 * 1. Integrated Firebase Authentication with real user creation/login
 * 2. Added SuccessDialog component for user feedback on auth actions
 * 3. Wrapped entire app with AuthProvider for centralized auth state
 * 4. Added global AuthPages component that all "Get Started" buttons trigger
 * 5. All authentication logic is now centralized in UserDataStore.tsx with Firebase
 * 6. No more mock authentication - real Firebase integration
 * 
 * FIREBASE AUTHENTICATION FLOW:
 * - ANY "Get Started" button calls openAuth() from useAuth hook
 * - ONE AuthPages modal handles all authentication via Firebase
 * - ONE UserDataStore manages all user data and Firebase API calls
 * - Success dialogs show when users register/login successfully
 * - User data is stored in Firestore and synchronized in real-time
 * 
 * SUCCESS DIALOGS:
 * - Registration success: "🎉 User created successfully! Welcome to Flint, [name]!"
 * - Login success: "🔥 Login successful! Welcome back, [name]!"
 * - Auto-hide after 3 seconds with progress bar
 * 
 * COMPATIBILITY IMPROVEMENTS:
 * - Replaced complex HeroIllustration with simple logo image
 * - No more WebGL dependencies that cause "green screen" issues
 * - Simple CSS glow effects that work on all devices/browsers
 * 
 * Main App Component - Flint Welcome Page
 * 
 * Design Notes:
 * - Dark theme welcome page with electric cyan accents
 * - Full-page layout with sticky header navigation
 * - Spark/ignition theme throughout all content and interactions
 * - Responsive design optimized for dark viewing
 * - Organized component structure for easy maintenance
 * - Electric animations and glowing interactions for engaging UX
 * 
 * Component Structure:
 * 1. Header - Dark navigation with Flint branding and lightning icon
 * 2. HeroSection - Electric welcome area with simple logo illustration
 * 3. FeatureCards - Interactive showcase with glowing card effects
 * 4. Footer - Dark footer with electric accents and social links
 * 5. AuthPages - Centralized authentication modal (globally accessible)
 * 6. SuccessDialog - Shows success messages for Firebase auth actions
 * 
 * Color Scheme - Dark Cyan Palette:
 * - Primary Background: Very dark cyan (#051a1a) - almost black with cyan undertones
 * - Secondary Background: Dark cyan (#0a2626) - for cards and elevated surfaces
 * - Accent Colors: Electric cyan (#14b8a6) and bright cyan (#2dd4bf) for highlights
 * - Text: Light cyan tints for excellent readability on dark backgrounds
 * 
 * Theme: "Spark & Ignition"
 * - Electric/lightning metaphors throughout copy
 * - Spark, ignite, electric, lightning terminology
 * - Fast, instant, electric speed messaging
 * - Connection and network building themes
 * 
 * Typography:
 * - High contrast white/cyan text on dark backgrounds
 * - Clear hierarchy with gradient text effects on key headlines
 * - Readable font sizes following 14px base from globals.css
 * - Proper line heights optimized for dark theme reading
 * 
 * Animations & Effects:
 * - Subtle glow effects using box-shadow with cyan colors
 * - Electric pulse animations on key elements
 * - Simple logo with CSS glow effects (no WebGL dependencies)
 * - Staggered card animations with glowing borders
 * - Smooth transitions between hover states with electric feedback
 * 
 * Accessibility:
 * - High contrast ratios for text readability
 * - Proper focus states with electric accent colors
 * - Semantic HTML structure maintained
 * - Responsive design for all device sizes
 */

// Internal component that uses auth context
function AppContent() {
  const { isAuthModalOpen, closeAuth, successMessage, clearSuccessMessage } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header with electric branding */}
      <Header />
      
      {/* Main content sections with dark electric theme */}
      <main className="w-full">
        {/* Hero section with simple logo illustration and ignition messaging */}
        <HeroSection />
        
        {/* Feature showcase with glowing electric cards */}
        <FeatureCards />
      </main>
      
      {/* Footer with electric accents and connection links */}
      <Footer />
      
      {/* GLOBAL AUTH MODAL - Triggered by ANY "Get Started" button */}
      <AuthPages isOpen={isAuthModalOpen} onClose={closeAuth} />
      
      {/* SUCCESS DIALOG - Shows Firebase auth success messages */}
      <SuccessDialog 
        isOpen={!!successMessage} 
        message={successMessage || ''} 
        onClose={clearSuccessMessage} 
      />
    </div>
  );
}

export default function App() {
  return (
    // WRAP ENTIRE APP WITH FIREBASE AUTH PROVIDER
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}