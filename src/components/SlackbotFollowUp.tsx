import React from 'react';

interface SlackbotFollowUpProps {
  appName: string;
  appIcon: string;
  workspaceName: string;
  adminName: string;
  autoInstallEnabled: boolean;
  onCreateRule: () => void;
}

export function SlackbotFollowUp({
  appName,
  appIcon,
  workspaceName,
  adminName,
  autoInstallEnabled,
  onCreateRule,
}: SlackbotFollowUpProps) {
  return (
    <div style={containerStyle}>
      {/* Approval confirmation */}
      <div style={confirmationStyle}>
        <span style={checkIconStyle}>✅</span>
        <span style={confirmTextStyle}>
          <span style={adminLinkStyle}>@{adminName}</span> approved a request for <span style={appLinkStyle}>{appName}</span> on <strong>{workspaceName}</strong>.
          Any member can now install and configure this app. <span style={linkStyle}>View all approved apps</span>
        </span>
      </div>

      {/* AAA rule prompt — only shows if auto-install was NOT already enabled during approval */}
      {!autoInstallEnabled && (
        <div style={rulePromptContainerStyle}>
          <div style={rulePromptHeaderStyle}>
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=slackbot&backgroundColor=ffd700"
              alt="Slackbot"
              style={avatarStyle}
            />
            <div>
              <span style={botNameStyle}>Slack</span>
              <span style={timestampStyle}>Just now</span>
            </div>
          </div>
          <div style={rulePromptBodyStyle}>
            <div style={ruleCardStyle}>
              <div style={ruleCardHeaderStyle}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ minWidth: '16px' }}>
                  <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM7.25 5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zM7 7h2v4H7V7z" fill="#1264a3" />
                </svg>
                <span style={ruleCardTitleStyle}>Set up auto-install for child agent apps?</span>
              </div>
              <p style={ruleCardDescStyle}>
                <strong>{appName}</strong> has the <code style={codeStyle}>app_configurations:write</code> scope, which allows it to create and manage child agent apps. You can set up an automation rule to automatically approve these child apps when they're installed.
              </p>
              <div style={ruleCardBenefitsStyle}>
                <div style={benefitItemStyle}>
                  <span style={bulletStyle}>•</span>
                  <span>Child apps created by {appName} will be auto-approved</span>
                </div>
                <div style={benefitItemStyle}>
                  <span style={bulletStyle}>•</span>
                  <span>No admin action required for each new agent app</span>
                </div>
                <div style={benefitItemStyle}>
                  <span style={bulletStyle}>•</span>
                  <span>You can add scope conditions to restrict what's auto-approved</span>
                </div>
                <div style={benefitItemStyle}>
                  <span style={bulletStyle}>•</span>
                  <span>Rule can be modified or removed at any time</span>
                </div>
              </div>
              <div style={ruleCardActionsStyle}>
                <button style={primaryBtnStyle} onClick={onCreateRule}>
                  Create Auto-Install Rule
                </button>
                <button style={secondaryBtnStyle}>
                  Manage in Settings
                </button>
                <button style={dismissBtnStyle}>
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* If auto-install WAS enabled during approval */}
      {autoInstallEnabled && (
        <div style={rulePromptContainerStyle}>
          <div style={rulePromptHeaderStyle}>
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=slackbot&backgroundColor=ffd700"
              alt="Slackbot"
              style={avatarStyle}
            />
            <div>
              <span style={botNameStyle}>Slack</span>
              <span style={timestampStyle}>Just now</span>
            </div>
          </div>
          <div style={rulePromptBodyStyle}>
            <div style={ruleConfirmCardStyle}>
              <div style={ruleCardHeaderStyle}>
                <span style={{ fontSize: '16px' }}>⚡</span>
                <span style={ruleCardTitleStyle}>Auto-install rule created</span>
              </div>
              <p style={ruleCardDescStyle}>
                An automation rule has been created for <strong>{appName}</strong>. Child agent apps created by this app will be automatically approved for installation on <strong>{workspaceName}</strong>.
              </p>
              <div style={ruleDetailBoxStyle}>
                <div style={ruleDetailRowStyle}>
                  <span style={ruleDetailLabelStyle}>Rule</span>
                  <span style={ruleDetailValueStyle}>Auto-approve child apps from {appName}</span>
                </div>
                <div style={ruleDetailRowStyle}>
                  <span style={ruleDetailLabelStyle}>Condition</span>
                  <span style={ruleDetailValueStyle}>Manager app = {appName}</span>
                </div>
                <div style={ruleDetailRowStyle}>
                  <span style={ruleDetailLabelStyle}>Action</span>
                  <span style={ruleDetailValueStyle}>Approve</span>
                </div>
              </div>
              <div style={ruleCardActionsStyle}>
                <button style={secondaryBtnStyle}>
                  View in Automation Rules
                </button>
                <button style={secondaryBtnStyle}>
                  Edit Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  padding: '0 20px',
};

const confirmationStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  padding: '8px 12px',
  marginBottom: '16px',
  borderLeft: '4px solid #2eb67d',
  backgroundColor: '#f0fdf4',
  borderRadius: '0 4px 4px 0',
};

const checkIconStyle: React.CSSProperties = {
  fontSize: '14px',
  marginTop: '1px',
};

const confirmTextStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--sk-color-text-primary)',
  lineHeight: '1.5',
};

const adminLinkStyle: React.CSSProperties = {
  color: '#1264a3',
  fontWeight: 600,
  cursor: 'pointer',
};

const appLinkStyle: React.CSSProperties = {
  color: '#1264a3',
  fontWeight: 600,
  cursor: 'pointer',
};

const linkStyle: React.CSSProperties = {
  color: '#1264a3',
  cursor: 'pointer',
};

const rulePromptContainerStyle: React.CSSProperties = {
  paddingTop: '8px',
  borderTop: '1px solid var(--sk-color-border-light)',
};

const rulePromptHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '4px',
};

const avatarStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '4px',
};

const botNameStyle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: '15px',
  color: 'var(--sk-color-text-primary)',
  marginRight: '8px',
};

const timestampStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'var(--sk-color-text-tertiary)',
};

const rulePromptBodyStyle: React.CSSProperties = {
  marginLeft: '44px',
};

const ruleCardStyle: React.CSSProperties = {
  border: '1px solid #d0e3f5',
  borderRadius: '8px',
  padding: '16px',
  backgroundColor: '#f8fbff',
};

const ruleConfirmCardStyle: React.CSSProperties = {
  border: '1px solid #c8e6c9',
  borderRadius: '8px',
  padding: '16px',
  backgroundColor: '#f0fdf4',
};

const ruleCardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
};

const ruleCardTitleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '15px',
  color: 'var(--sk-color-text-primary)',
};

const ruleCardDescStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--sk-color-text-secondary)',
  lineHeight: '1.5',
  margin: '0 0 12px',
};

const codeStyle: React.CSSProperties = {
  fontSize: '12px',
  backgroundColor: '#f0f0f0',
  padding: '1px 5px',
  borderRadius: '3px',
  fontFamily: 'Monaco, Menlo, monospace',
  color: '#d63384',
};

const ruleCardBenefitsStyle: React.CSSProperties = {
  marginBottom: '14px',
};

const benefitItemStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  fontSize: '13px',
  color: 'var(--sk-color-text-primary)',
  lineHeight: '1.6',
};

const bulletStyle: React.CSSProperties = {
  color: 'var(--sk-color-text-tertiary)',
};

const ruleCardActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const primaryBtnStyle: React.CSSProperties = {
  backgroundColor: '#007a5a',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
};

const secondaryBtnStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: 'var(--sk-color-text-primary)',
  border: '1px solid var(--sk-color-border-medium)',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
};

const dismissBtnStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: 'var(--sk-color-text-secondary)',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 12px',
  fontSize: '13px',
  cursor: 'pointer',
};

const ruleDetailBoxStyle: React.CSSProperties = {
  backgroundColor: 'white',
  border: '1px solid #c8e6c9',
  borderRadius: '6px',
  padding: '12px',
  marginBottom: '12px',
};

const ruleDetailRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  fontSize: '13px',
  padding: '4px 0',
};

const ruleDetailLabelStyle: React.CSSProperties = {
  fontWeight: 600,
  color: 'var(--sk-color-text-secondary)',
  minWidth: '70px',
};

const ruleDetailValueStyle: React.CSSProperties = {
  color: 'var(--sk-color-text-primary)',
};
