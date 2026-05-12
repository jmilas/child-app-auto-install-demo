import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  variant?: 'success' | 'info';
}

export function Toast({ message, visible, onDismiss, variant = 'success' }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss]);

  if (!visible) return null;

  const bgColor = variant === 'success' ? 'var(--sk-color-success)' : 'var(--sk-color-primary)';

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: bgColor,
      color: 'white',
      padding: '12px 20px',
      borderRadius: 'var(--sk-radius-md)',
      boxShadow: 'var(--sk-shadow-toast)',
      fontSize: 'var(--sk-font-size-base)',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      zIndex: 2000,
      animation: 'slideUp 200ms ease',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" fill="white" fillOpacity="0.2" />
        <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {message}
    </div>
  );
}
