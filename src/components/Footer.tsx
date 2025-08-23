import { motion } from 'motion/react';
import { Zap, Github, Mail } from 'lucide-react';

/**
 * Footer Component - Flint Dark Theme (Simplified)
 * 
 * Design Notes:
 * - Dark footer with subtle electric accents
 * - Flint branding with spark/lightning theme
 * - Simplified structure without community section
 * - Social media links with hover glow effects
 * - Consistent dark cyan styling throughout
 * - Responsive layout that adapts to mobile
 * - Electric border effects and subtle animations
 * - Focus on product and support only
 */

// Discord logo SVG component
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
    </svg>
  );
}
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-flint-dark border-t border-flint-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-flint-accent to-flint-accent-bright shadow-lg shadow-flint-accent/20">
                <Zap className="w-5 h-5 text-flint-black" />
              </div>
              <span className="text-lg font-semibold text-foreground">Flint</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Igniting minds through electric connections. Open source yet privacy focused note-taking built for speed, privacy, and creative flow.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <div className="space-y-2">
              <motion.a 
                href="#features"
                whileHover={{ x: 4 }}
                className="block text-muted-foreground hover:text-flint-accent-bright transition-colors duration-200 text-sm"
              >
                Features
              </motion.a>
              <motion.button 
                onClick={scrollToTop}
                whileHover={{ x: 4 }}
                className="block text-left text-muted-foreground hover:text-flint-accent-bright transition-colors duration-200 text-sm cursor-pointer"
              >
                About
              </motion.button>
              <motion.a 
                href="#releases"
                whileHover={{ x: 4 }}
                className="block text-muted-foreground hover:text-flint-accent-bright transition-colors duration-200 text-sm"
              >
                Releases
              </motion.a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-3 sm:space-x-4">
              <motion.a
                href="#discord"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 sm:w-8 sm:h-8 bg-flint-darker hover:bg-flint-accent/20 border border-flint-accent/30 hover:border-flint-accent-bright/60 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:shadow-flint-accent/20 touch-manipulation"
              >
                <DiscordIcon className="w-5 h-5 sm:w-4 sm:h-4 text-flint-accent hover:text-flint-accent-bright transition-colors duration-200" />
              </motion.a>
              <motion.a
                href="#github"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 sm:w-8 sm:h-8 bg-flint-darker hover:bg-flint-accent/20 border border-flint-accent/30 hover:border-flint-accent-bright/60 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:shadow-flint-accent/20 touch-manipulation"
              >
                <Github className="w-5 h-5 sm:w-4 sm:h-4 text-flint-accent hover:text-flint-accent-bright transition-colors duration-200" />
              </motion.a>
              <motion.a
                href="#email"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 sm:w-8 sm:h-8 bg-flint-darker hover:bg-flint-accent/20 border border-flint-accent/30 hover:border-flint-accent-bright/60 rounded-lg flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:shadow-flint-accent/20 touch-manipulation"
              >
                <Mail className="w-5 h-5 sm:w-4 sm:h-4 text-flint-accent hover:text-flint-accent-bright transition-colors duration-200" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pt-6 sm:pt-8 border-t border-flint-darker flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0"
        >
          <p className="text-muted-foreground text-sm text-center sm:text-left">
            © 2025 Flint. Open source and free forever. ⚡
          </p>
          <div className="flex space-x-4 sm:space-x-6 text-sm">
            <motion.a 
              href="#privacy"
              whileHover={{ scale: 1.05 }}
              className="text-muted-foreground hover:text-flint-accent-bright transition-colors duration-200 py-2 px-1 touch-manipulation"
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#github"
              whileHover={{ scale: 1.05 }}
              className="text-muted-foreground hover:text-flint-accent-bright transition-colors duration-200 py-2 px-1 touch-manipulation"
            >
              Open Source
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}