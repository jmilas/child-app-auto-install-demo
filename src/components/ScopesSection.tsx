import React, { useState } from 'react';
import type { ScopeInfo } from '../data/mock-app';

interface ScopesSectionProps {
  botScopes: ScopeInfo[];
  userScopes: ScopeInfo[];
}

type Tab = 'scopes' | 'security';

export function ScopesSection({ botScopes, userScopes }: ScopesSectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>('scopes');

  return (
    <div>
      <div style={tabBarStyle}>
        <button
          style={activeTab === 'scopes' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('scopes')}
        >
          Scopes {botScopes.length + userScopes.length}
        </button>
        <button
          style={activeTab === 'security' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('security')}
        >
          Security &amp; Compliance
        </button>
      </div>

      {activeTab === 'scopes' && (
        <div style={scopeContentStyle}>
          <p style={scopeIntroStyle}>
            This app requests permission to access the following resources:
          </p>

          {botScopes.length > 0 && (
            <>
              <div style={scopeGroupLabelStyle}>On behalf of the bot, {mockAppName} can:</div>
              <table style={scopeTableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Required</th>
                    <th style={thStyle}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {botScopes.map((scope) => (
                    <tr key={scope.name}>
                      <td style={tdScopeStyle}>
                        <span style={scopeNameStyle}>{scope.name}</span>
                      </td>
                      <td style={tdDescStyle}>{scope.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {userScopes.length > 0 && (
            <>
              <div style={{ ...scopeGroupLabelStyle, marginTop: '16px' }}>
                On behalf of users, {mockAppName} can:
              </div>
              <table style={scopeTableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Required</th>
                    <th style={thStyle}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {userScopes.map((scope) => (
                    <tr key={scope.name}>
                      <td style={tdScopeStyle}>
                        <span style={scopeNameStyle}>{scope.name}</span>
                      </td>
                      <td style={tdDescStyle}>{scope.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

      {activeTab === 'security' && (
        <div style={scopeContentStyle}>
          <div style={securityPlaceholderStyle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 1l7 3v5c0 4.5-3 8.5-7 9.5-4-1-7-5-7-9.5V4l7-3z" stroke="#616061" strokeWidth="1.5" fill="none" />
              <path d="M7 10l2 2 4-4" stroke="#616061" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>No security or compliance information available for this app.</span>
          </div>
        </div>
      )}
    </div>
  );
}

const mockAppName = 'Acme Agent Platform';

const tabBarStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0',
  borderBottom: '1px solid var(--sk-color-border-light)',
  marginBottom: '0',
};

const tabStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  borderBottom: '2px solid transparent',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--sk-color-text-secondary)',
  cursor: 'pointer',
  marginBottom: '-1px',
};

const activeTabStyle: React.CSSProperties = {
  ...tabStyle,
  color: 'var(--sk-color-text-primary)',
  borderBottomColor: 'var(--sk-color-primary)',
};

const scopeContentStyle: React.CSSProperties = {
  paddingTop: '12px',
};

const scopeIntroStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-secondary)',
  marginBottom: '12px',
};

const scopeGroupLabelStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-primary)',
  fontWeight: 400,
  marginBottom: '8px',
};

const scopeTableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  fontWeight: 600,
  color: 'var(--sk-color-text-secondary)',
  fontSize: '12px',
  padding: '6px 8px',
  borderBottom: '1px solid var(--sk-color-border-light)',
};

const tdScopeStyle: React.CSSProperties = {
  padding: '8px 8px',
  borderBottom: '1px solid var(--sk-color-border-light)',
  verticalAlign: 'top',
  whiteSpace: 'nowrap',
};

const tdDescStyle: React.CSSProperties = {
  padding: '8px 8px',
  borderBottom: '1px solid var(--sk-color-border-light)',
  color: 'var(--sk-color-text-secondary)',
  verticalAlign: 'top',
};

const scopeNameStyle: React.CSSProperties = {
  fontFamily: 'Monaco, Menlo, monospace',
  fontSize: '12px',
  color: 'var(--sk-color-primary)',
  textDecoration: 'none',
};

const securityPlaceholderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '16px',
  color: 'var(--sk-color-text-secondary)',
  fontSize: '13px',
};
