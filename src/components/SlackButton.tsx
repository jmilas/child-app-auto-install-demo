import React from 'react';

type ButtonVariant = 'primary' | 'danger' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface SlackButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const baseStyles: React.CSSProperties = {
  fontFamily: 'var(--sk-font-family)',
  fontWeight: 700,
  borderRadius: 'var(--sk-radius-sm)',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  transition: 'background var(--sk-transition-fast), opacity var(--sk-transition-fast)',
  whiteSpace: 'nowrap',
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  small: { fontSize: '12px', padding: '4px 12px', height: '28px' },
  medium: { fontSize: '13px', padding: '6px 16px', height: '36px' },
  large: { fontSize: '15px', padding: '8px 20px', height: '40px' },
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--sk-color-primary)',
    color: 'var(--sk-color-text-inverse)',
  },
  danger: {
    backgroundColor: 'var(--sk-color-danger)',
    color: 'var(--sk-color-text-inverse)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--sk-color-text-primary)',
    border: '1px solid var(--sk-color-border)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--sk-color-primary)',
  },
};

export function SlackButton({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  children,
  style,
}: SlackButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...(isDisabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}),
        ...style,
      }}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" style={{ animation: 'spin 1s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
      <path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
