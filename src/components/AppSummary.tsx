import React from 'react';

interface AppSummaryProps {
  name: string;
  description?: string;
  icon: string;
  developer: string;
}

export function AppSummary({ name, icon, developer }: AppSummaryProps) {
  return (
    <div style={containerStyle}>
      <img
        src={icon}
        alt={`${name} icon`}
        style={iconStyle}
      />
      <div style={{ flex: 1 }}>
        <div style={nameStyle}>{name}</div>
        <div style={developerStyle}>by {developer}</div>
      </div>
      <button style={moreButtonStyle}>•••</button>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
};

const iconStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  border: '1px solid var(--sk-color-border-light)',
  objectFit: 'cover',
};

const nameStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 900,
  color: 'var(--sk-color-text-primary)',
};

const developerStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-secondary)',
  marginTop: '1px',
};

const moreButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '16px',
  color: 'var(--sk-color-text-secondary)',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  letterSpacing: '1px',
};
