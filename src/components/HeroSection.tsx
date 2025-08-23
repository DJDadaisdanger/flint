import { motion } from "motion/react";
import { Button } from "./ui/button";
import { LogoIllustration } from "./LogoIllustration";
import { ArrowRight } from "lucide-react";
import { useAuth } from "./UserDataStore";

/**
 * BACKEND INTEGRATION NOTES:
 * 
 * Hero Section now uses centralized auth system with SIMPLE logo illustration
 * 
 * Key Changes:
 * - Uses useAuth() hook instead of local state
 * - REPLACED complex HeroIllustration with simple LogoIllustration
 * - Single "Get Started" button that calls centralized openAuth()
 * 
 * SIMPLE LOGO ILLUSTRATION:
 * - Static logo image with subtle glow effects
 * - Mobile-compatible (no animations or WebGL)
 * - Universal browser support
 * - Electric cyan glow effects maintain the spark theme
 */
export function HeroSection() {
  const { openAuth } = useAuth(); // ← CENTRALIZED AUTH CONTROL

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-flint-black via-flint-dark to-flint-black">
      {/* Background electric effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-flint-accent/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-flint-accent-bright/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-flint-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Mobile-first layout: Logo > Content on mobile, Side-by-side on desktop */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          
          {/* Logo appears first on mobile, right column on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="order-1 lg:order-2 lg:ml-8 mb-8 lg:mb-0 flex justify-center lg:justify-end"
          >
            <LogoIllustration />
          </motion.div>

          {/* Content appears second on mobile, left column on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            {/* Open Source Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-flint-darker border border-flint-accent/30 text-flint-accent-bright"
            >
              <span className="w-2 h-2 bg-flint-accent-bright rounded-full mr-2 animate-pulse shadow-sm shadow-flint-accent-bright"></span>
              Open Source & Free
            </motion.div>
            
            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Ignite your ideas,
                <span className="block bg-gradient-to-r from-flint-accent to-flint-accent-bright bg-clip-text font-bold text-transparent">
                  spark connections
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Flint turns fleeting thoughts into powerful
                insights. Capture, connect, and amplify your
                ideas with the speed of thought and the freedom
                of open source.
              </p>
            </motion.div>
            
            {/* CTA Button - Full width on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-flint-accent hover:bg-flint-accent-bright text-flint-black border-0 group shadow-lg shadow-flint-accent/30 hover:shadow-flint-accent-bright/40 transition-all duration-300 px-8 py-4 text-lg"
                onClick={openAuth} // ← UNIFIED: Same as all other "Get Started" buttons
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
            
            {/* Trust indicators - Stack on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="text-flint-accent-bright">
                  ⚡
                </span>{" "}
                Lightning fast
              </div>
              <div className="flex items-center gap-2">
                <span className="text-flint-accent-bright">
                  🔒
                </span>{" "}
                Privacy focused
              </div>
              <div className="flex items-center gap-2">
                <span className="text-flint-accent-bright">
                  💡
                </span>{" "}
                Open source
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}