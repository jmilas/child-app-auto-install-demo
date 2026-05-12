import React from 'react';

export type Screen = 'workspace' | 'org' | 'slackbot';

interface NavigationBarProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

const tabs: { id: Screen; label: string; description: string }[] = [
  { id: 'workspace', label: 'Workspace Approval', description: 'Admin approves from Apps Manage page' },
  { id: 'org', label: 'Org-Level Approval', description: 'Enterprise admin approves for org' },
  { id: 'slackbot', label: 'Slackbot DM', description: 'Approve from notification message' },
];

export function NavigationBar({ active, onChange }: NavigationBarProps) {
  return (
    <div style={containerStyle}>
      <div style={innerStyle}>
        <div style={brandStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="var(--sk-color-bg-sidebar)" />
            <text x="5" y="17" fontSize="12" fontWeight="bold" fill="white">A</text>
          </svg>
          <span style={{ fontWeight: 900, fontSize: '15px' }}>Auto-Install UX Demo</span>
        </div>
        <div style={tabsStyle}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              style={{
                ...tabStyle,
                ...(active === tab.id ? activeTabStyle : {}),
              }}
              title={tab.description}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  backgroundColor: 'var(--sk-color-bg-primary)',
  borderBottom: '1px solid var(--sk-color-border)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
};

const innerStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '12px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '24px',
};

const brandStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: 'var(--sk-color-text-primary)',
};

const tabsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
  backgroundColor: 'var(--sk-color-bg-tertiary)',
  borderRadius: 'var(--sk-radius-md)',
  padding: '3px',
};

const tabStyle: React.CSSProperties = {
  fontSize: 'var(--sk-font-size-sm)',
  fontWeight: 700,
  fontFamily: 'var(--sk-font-family)',
  color: 'var(--sk-color-text-secondary)',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '6px 14px',
  borderRadius: 'var(--sk-radius-sm)',
  cursor: 'pointer',
  transition: 'all var(--sk-transition-fast)',
  whiteSpace: 'nowrap',
};

const activeTabStyle: React.CSSProperties = {
  backgroundColor: 'var(--sk-color-bg-primary)',
  color: 'var(--sk-color-text-primary)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
};
