import { motion } from "motion/react";

/**
 * Simple Hero Illustration - Universal Compatibility
 * 
 * COMPATIBILITY NOTES:
 * - Replaced complex WebGL/Framer Motion 3D effects with simple CSS animations
 * - Uses basic SVG shapes instead of complex graphics that might not load
 * - No external image dependencies that could fail to load
 * - Pure CSS animations that work on all devices and browsers
 * - Fallback-friendly design with graceful degradation
 * 
 * This version should work universally without the "green screen" issue
 * caused by WebGL or complex graphics not loading properly.
 */

export function SimpleHeroIllustration() {
  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-80 h-80 rounded-full bg-flint-accent/20 blur-3xl"
        />
      </div>

      {/* Central spark/logo area */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Main spark */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-flint-accent to-flint-accent-bright shadow-lg shadow-flint-accent/50 flex items-center justify-center"
        >
          {/* Zap icon using Unicode */}
          <span className="text-2xl text-flint-black">⚡</span>
        </motion.div>

        {/* Orbiting elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-32 h-32"
        >
          {/* Top spark */}
          <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-flint-accent shadow-sm shadow-flint-accent transform -translate-x-1/2" />
          
          {/* Right spark */}
          <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-flint-accent-bright shadow-sm shadow-flint-accent-bright transform -translate-y-1/2" />
          
          {/* Bottom spark */}
          <div className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full bg-flint-accent shadow-sm shadow-flint-accent transform -translate-x-1/2" />
          
          {/* Left spark */}
          <div className="absolute left-0 top-1/2 w-2 h-2 rounded-full bg-flint-accent-bright shadow-sm shadow-flint-accent-bright transform -translate-y-1/2" />
        </motion.div>

        {/* Larger orbit */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-48 h-48"
        >
          {/* Orbit sparks */}
          <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-flint-accent/60 transform -translate-x-1/2" />
          <div className="absolute right-0 top-1/2 w-1 h-1 rounded-full bg-flint-accent-bright/60 transform -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full bg-flint-accent/60 transform -translate-x-1/2" />
          <div className="absolute left-0 top-1/2 w-2 h-2 rounded-full bg-flint-accent-bright/60 transform -translate-y-1/2" />
        </motion.div>

        {/* Connection lines */}
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Horizontal line */}
          <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-flint-accent to-transparent" />
          
          {/* Vertical line */}
          <div className="absolute h-24 w-px bg-gradient-to-b from-transparent via-flint-accent-bright to-transparent" />
        </motion.div>

        {/* Floating text elements */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -top-20 left-0 text-xs text-flint-accent/60 font-mono"
        >
          ideas
        </motion.div>

        <motion.div
          animate={{ 
            y: [10, -10, 10],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-20 right-0 text-xs text-flint-accent-bright/60 font-mono"
        >
          connections
        </motion.div>

        <motion.div
          animate={{ 
            x: [-5, 5, -5],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-0 -right-16 text-xs text-flint-accent/60 font-mono"
        >
          spark
        </motion.div>
      </div>

      {/* Pulse rings */}
      <motion.div
        animate={{ 
          scale: [1, 2, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeOut"
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-20 h-20 rounded-full border border-flint-accent/30" />
      </motion.div>

      <motion.div
        animate={{ 
          scale: [1, 2.5, 1],
          opacity: [0.2, 0, 0.2]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-20 h-20 rounded-full border border-flint-accent-bright/20" />
      </motion.div>
    </div>
  );
}