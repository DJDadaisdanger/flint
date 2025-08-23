import React, { useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface SuccessDialogProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export function SuccessDialog({ isOpen, message, onClose }: SuccessDialogProps) {
  // Auto-close after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-flint-dark border border-flint-accent rounded-lg p-6 max-w-md w-full shadow-2xl pointer-events-auto"
        style={{
          boxShadow: '0 25px 50px -12px rgba(20, 184, 166, 0.25), 0 0 0 1px rgba(20, 184, 166, 0.1)'
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-flint-accent rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-flint-black" />
            </div>
            <div className="text-lg font-semibold text-dark-cyan-100">
              Success!
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-dark-cyan-300 hover:text-flint-accent-bright transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-dark-cyan-200 leading-relaxed">
          {message}
        </p>
        
        {/* Progress bar for auto-close */}
        <div className="mt-4 w-full bg-flint-darker rounded-full h-1">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            className="bg-flint-accent h-1 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}