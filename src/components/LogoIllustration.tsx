import logoImage from 'figma:asset/logo.png';

/**
 * MOBILE-COMPATIBLE LOGO ILLUSTRATION
 * 
 * Simple, static logo with subtle glow effects
 * 
 * Features:
 * - Static logo image (no animations that cause mobile issues)
 * - Subtle CSS glow effects using box-shadow
 * - Electric cyan theme maintained
 * - Universal compatibility (no WebGL, no complex animations)
 * - Responsive sizing for all devices
 * 
 * This replaces the complex HeroIllustration to solve:
 * - Mobile compatibility issues
 * - Animation performance problems
 * - Universal browser support
 */
export function LogoIllustration() {
  return (
    <div className="flex items-center justify-center px-4">
      {/* Simple logo with electric glow effect */}
      <div className="relative max-w-full">
        {/* Glow layers for electric effect */}
        <div className="absolute inset-0 blur-xl opacity-60">
          <img
            src={logoImage}
            alt=""
            className="w-full h-full object-contain"
            style={{
              filter: 'brightness(2) saturate(2)',
              color: '#14b8a6'
            }}
          />
        </div>
        <div className="absolute inset-0 blur-lg opacity-40">
          <img
            src={logoImage}
            alt=""
            className="w-full h-full object-contain"
            style={{
              filter: 'brightness(1.5) saturate(1.5)',
              color: '#2dd4bf'
            }}
          />
        </div>
        
        {/* Main logo - Responsive sizing for mobile-first */}
        <img
          src={logoImage}
          alt="Flint Logo"
          className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain mx-auto"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(20, 184, 166, 0.5)) drop-shadow(0 0 40px rgba(45, 212, 191, 0.3))',
          }}
        />
      </div>
    </div>
  );
}