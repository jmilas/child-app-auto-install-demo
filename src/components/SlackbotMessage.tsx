import React from 'react';
import type { ScopeInfo } from '../data/mock-app';

interface SlackbotMessageProps {
  appName: string;
  appIcon: string;
  requesterName: string;
  requesterAvatar: string;
  botScopes: ScopeInfo[];
  userScopes: ScopeInfo[];
  workspaceName: string;
  stepsIncluded?: boolean;
  onApproveClick: () => void;
  onRestrictClick: () => void;
}

export function SlackbotMessage({
  appName,
  appIcon,
  requesterName,
  requesterAvatar,
  botScopes,
  userScopes,
  workspaceName,
  stepsIncluded = false,
  onApproveClick,
  onRestrictClick,
}: SlackbotMessageProps) {
  return (
    <div style={messageContainerStyle}>
      <div style={messageHeaderStyle}>
        <img
          src="https://api.dicebear.com/7.x/bottts/svg?seed=slackbot&backgroundColor=ffd700"
          alt="Slackbot"
          style={avatarStyle}
        />
        <div>
          <span style={botNameStyle}>Slack</span>
          <span style={timestampStyle}>3 minutes ago</span>
        </div>
      </div>
      <div style={messageBodyStyle}>
        <p style={messageTextStyle}>
          <img src={requesterAvatar} alt="" style={inlineAvatarStyle} />
          <span style={linkStyle}>{requesterName}</span> would like to install the app <span style={linkStyle}>{appName}</span> on the workspace <strong>{workspaceName}</strong>
        </p>

        <div style={attachmentStyle}>
          <div style={attachmentHeaderStyle}>
            <img src={appIcon} alt={appName} style={appIconStyle} />
            <strong>{appName}</strong>
          </div>
          <p style={attachmentDescStyle}>
            Enterprise AI agent orchestration platform that creates and manages specialized agent apps for your workspace.
          </p>
          <div style={attachmentBodyStyle}>Full description</div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>{botScopes.length + userScopes.length} permissions &amp; scopes requested</div>
          <div style={permissionsListStyle}>
            <p style={permGroupStyle}>On behalf of the app:</p>
            {botScopes.map((scope, i) => (
              <div key={scope.name} style={permItemStyle}>
                · {scope.description} (<span style={scopeLinkStyle}>{scope.name}</span>)
              </div>
            ))}
            {userScopes.length > 0 && (
              <>
                <p style={{ ...permGroupStyle, marginTop: '8px' }}>On behalf of users, {appName} can:</p>
                {userScopes.map((scope) => (
                  <div key={scope.name} style={permItemStyle}>
                    · {scope.description} (<span style={scopeLinkStyle}>{scope.name}</span>)
                  </div>
                ))}
              </>
            )}
            <div style={showMoreStyle}>Show more</div>
          </div>
        </div>

        {stepsIncluded && (
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>1 step included</div>
            <div style={stepItemStyle}>Create an out-of-office event</div>
          </div>
        )}

        <div style={warningBannerStyle}>
          <span style={warningIconStyle}>⚠️</span>
          <span>All actions on a request will affect the entire workspace</span>
        </div>

        <div style={actionsStyle}>
          <button style={greenBtnStyle} onClick={onApproveClick}>
            Review and Approve for Workspace
          </button>
          <button style={greenOutlineBtnStyle} onClick={onRestrictClick}>
            Review and Restrict for Workspace
          </button>
        </div>
      </div>
    </div>
  );
}

const messageContainerStyle: React.CSSProperties = {
  padding: '8px 20px',
  maxWidth: '700px',
};

const messageHeaderStyle: React.CSSProperties = {
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

const messageBodyStyle: React.CSSProperties = {
  marginLeft: '44px',
};

const messageTextStyle: React.CSSProperties = {
  fontSize: '15px',
  color: 'var(--sk-color-text-primary)',
  lineHeight: '1.5',
  marginBottom: '8px',
};

const inlineAvatarStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  borderRadius: '4px',
  verticalAlign: 'middle',
  marginRight: '4px',
};

const linkStyle: React.CSSProperties = {
  color: '#1264a3',
  fontWeight: 600,
  cursor: 'pointer',
};

const attachmentStyle: React.CSSProperties = {
  borderLeft: '4px solid #ddd',
  paddingLeft: '12px',
  marginBottom: '12px',
};

const attachmentHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '15px',
  marginBottom: '4px',
};

const appIconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  borderRadius: '4px',
};

const attachmentDescStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--sk-color-text-secondary)',
  margin: '4px 0',
  lineHeight: '1.4',
};

const attachmentBodyStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#1264a3',
  cursor: 'pointer',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '12px',
};

const sectionHeaderStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '14px',
  color: 'var(--sk-color-text-primary)',
  marginBottom: '4px',
};

const permissionsListStyle: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.6',
};

const permGroupStyle: React.CSSProperties = {
  color: 'var(--sk-color-text-primary)',
  fontSize: '14px',
  margin: '4px 0 2px',
};

const permItemStyle: React.CSSProperties = {
  color: 'var(--sk-color-text-primary)',
  fontSize: '14px',
  paddingLeft: '4px',
};

const scopeLinkStyle: React.CSSProperties = {
  color: '#1264a3',
  cursor: 'pointer',
};

const showMoreStyle: React.CSSProperties = {
  color: '#1264a3',
  fontSize: '13px',
  cursor: 'pointer',
  marginTop: '4px',
};

const stepItemStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--sk-color-text-primary)',
  paddingLeft: '4px',
};

const warningBannerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  backgroundColor: '#fff8e1',
  border: '1px solid #ffe0b2',
  borderRadius: '6px',
  fontSize: '14px',
  color: '#5d4200',
  marginBottom: '12px',
};

const warningIconStyle: React.CSSProperties = {
  fontSize: '14px',
};

const actionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
};

const greenBtnStyle: React.CSSProperties = {
  backgroundColor: '#007a5a',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
};

const greenOutlineBtnStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#007a5a',
  border: '1px solid #007a5a',
  borderRadius: '4px',
  padding: '8px 16px',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
};
