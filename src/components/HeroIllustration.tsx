import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useEffect } from 'react';
import logoImage from 'figma:asset/81e588c3016666137cc057962ad813bb962a1dac.png';

export function HeroIllustration() {
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D rotation based on mouse position
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  // Smooth spring for 3D rotation
  const springRotateX = useSpring(rotateX, { stiffness: 80, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 80, damping: 25 });

  // Dodge motion values with springs for smooth animation
  const dodgeX = useMotionValue(0);
  const dodgeY = useMotionValue(0);
  const skewX = useMotionValue(0);
  const skewY = useMotionValue(0);

  // Springs to smooth dodge animations
  const springDodgeX = useSpring(dodgeX, { stiffness: 100, damping: 30 });
  const springDodgeY = useSpring(dodgeY, { stiffness: 100, damping: 30 });
  const springSkewX = useSpring(skewX, { stiffness: 100, damping: 30 });
  const springSkewY = useSpring(skewY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Normalize mouse coords to [-300, 300]
      const x = (clientX - innerWidth / 2) * 0.5;
      const y = (clientY - innerHeight / 2) * 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Handle dodge effect on logo mouse move
  const handleMouseMoveOnLogo = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const offsetX = centerX - e.clientX;
    const offsetY = centerY - e.clientY;

    const maxDodge = 5; // Max pixels for translation
    const maxSkew = 2;  // Max degrees for skew

    // Clamp dodge translation
    const clampedDodgeX = Math.max(-maxDodge, Math.min(maxDodge, offsetX));
    const clampedDodgeY = Math.max(-maxDodge, Math.min(maxDodge, offsetY));

    // Calculate skew proportional to dodge
    const calculatedSkewX = (clampedDodgeY / maxDodge) * maxSkew;
    const calculatedSkewY = (clampedDodgeX / maxDodge) * maxSkew;

    // Instead of direct state, set the motion values for smooth spring animation
    dodgeX.set(clampedDodgeX);
    dodgeY.set(clampedDodgeY);
    skewX.set(calculatedSkewX);
    skewY.set(calculatedSkewY);
  };

  // Reset dodge transforms on mouse leave (spring back to zero)
  const handleMouseLeaveLogo = () => {
    dodgeX.set(0);
    dodgeY.set(0);
    skewX.set(0);
    skewY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative w-full h-96 flex items-center justify-center overflow-visible"
    >
      <motion.svg
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
          overflow: 'visible',
        }}
        width="600"
        height="450"
        viewBox="0 0 600 450"
        className="drop-shadow-2xl overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Glowing animated ellipsoid background */}
        <motion.ellipse
          animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          cx="300"
          cy="225"
          rx="195"
          ry="165"
          fill="url(#glowGradient)"
          filter="url(#glowFilter)"
        />

        {/* Logo image with smooth dodging and 3D swivel */}
        <motion.image
          href={logoImage}
          x="160"
          y="40"
          height={220 * 2.35}
          width={200 * 2.35}
          style={{
            filter: 'drop-shadow(0 0 32px #14b8a6)',
            cursor: 'pointer',
            transformOrigin: 'center center',
            translateX: springDodgeX,
            translateY: springDodgeY,
            skewX: springSkewX,
            skewY: springSkewY,
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          onMouseMove={handleMouseMoveOnLogo}
          onMouseLeave={handleMouseLeaveLogo}
        />

        {/* Subtle cyan spark effect */}
        <motion.ellipse
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
          cx="460"
          cy="156"
          rx="15"
          ry="9"
          fill="#5eead4"
          filter="url(#sparkGlow)"
        />

        {/* Gradient and filters definitions */}
        <defs>
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.04" />
          </radialGradient>
          <filter id="glowFilter" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="17" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sparkGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </motion.svg>
    </motion.div>
  );
}