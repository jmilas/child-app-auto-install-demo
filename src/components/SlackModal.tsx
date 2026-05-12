import React from 'react';

interface SlackModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function SlackModal({ isOpen, onClose, title, children, footer }: SlackModalProps) {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <button style={closeButtonStyle} onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div style={contentStyle}>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>
  );
}

export function ModalSection({ children, borderBottom = true }: { children: React.ReactNode; borderBottom?: boolean }) {
  return (
    <div style={{
      padding: '16px 0',
      borderBottom: borderBottom ? '1px solid var(--sk-color-border-light)' : 'none',
    }}>
      {children}
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'var(--sk-color-bg-overlay)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  animation: 'fadeIn 150ms ease',
};

const modalStyle: React.CSSProperties = {
  backgroundColor: 'var(--sk-color-bg-primary)',
  borderRadius: 'var(--sk-radius-lg)',
  boxShadow: 'var(--sk-shadow-modal)',
  width: '100%',
  maxWidth: '520px',
  maxHeight: '85vh',
  display: 'flex',
  flexDirection: 'column',
  animation: 'slideUp 200ms ease',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 28px 0',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--sk-font-size-lg)',
  fontWeight: 900,
  color: 'var(--sk-color-text-primary)',
  margin: 0,
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--sk-color-text-secondary)',
  padding: '4px',
  borderRadius: 'var(--sk-radius-sm)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentStyle: React.CSSProperties = {
  padding: '12px 28px',
  overflowY: 'auto',
  flex: 1,
};

const footerStyle: React.CSSProperties = {
  padding: '16px 28px',
  borderTop: '1px solid var(--sk-color-border-light)',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 'var(--sk-space-100)',
};
