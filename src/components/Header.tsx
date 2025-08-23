import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Zap, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "./UserDataStore";

/**
 * BACKEND INTEGRATION NOTES:
 * 
 * Header now uses centralized auth system - ALL "Get Started" buttons
 * throughout the app now trigger the same authentication flow.
 * 
 * Key Changes:
 * - Uses useAuth() hook instead of local state
 * - All auth modal control is centralized
 * - No more duplicate auth modals or conflicting states
 * 
 * UNIFIED AUTHENTICATION:
 * - Header "Get Started" button → calls openAuth()
 * - Hero "Get Started" button → calls openAuth()  
 * - Any other "Get Started" button → calls openAuth()
 * - ONE auth modal, ONE auth state, ONE backend integration point
 */
export function Header() {
  const { openAuth } = useAuth(); // ← CENTRALIZED AUTH CONTROL

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full border-b border-flint-darker bg-flint-black/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Name (clickable) */}
          <div
            onClick={scrollToTop}
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-flint-accent to-flint-accent-bright shadow-lg shadow-flint-accent/20"
            >
              <Zap className="w-6 h-6 text-flint-black" />
            </motion.div>
            <h1 className="text-xl font-semibold text-foreground">Flint</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              className="text-muted-foreground hover:text-flint-accent-bright transition-colors duration-200"
            >
              Features
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              className="text-muted-foreground hover:text-flint-accent-bright transition-colors duration-200"
               onClick={scrollToBottom}
            >
              About
            </motion.a>
          </nav>

          {/* CTA Button and Mobile Menu - UNIFIED AUTH */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={openAuth} // ← UNIFIED: Same as all other "Get Started" buttons
              className="hidden sm:inline-flex bg-flint-accent hover:bg-flint-accent-bright text-flint-black border-0 shadow-lg shadow-flint-accent/20 hover:shadow-flint-accent-bright/30 transition-all duration-300"
            >
              Get Started
            </Button>
            {/* Mobile Get Started Button - UNIFIED AUTH */}
            <Button
              onClick={openAuth} // ← UNIFIED: Same as all other "Get Started" buttons
              className="sm:hidden bg-flint-accent hover:bg-flint-accent-bright text-flint-black border-0 shadow-lg shadow-flint-accent/20 hover:shadow-flint-accent-bright/30 transition-all duration-300 px-3"
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}