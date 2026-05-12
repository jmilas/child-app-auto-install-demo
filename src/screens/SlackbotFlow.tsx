import React, { useState } from 'react';
import { SlackModal, ModalSection } from '../components/SlackModal';
import { SlackButton } from '../components/SlackButton';
import { SlackbotMessage } from '../components/SlackbotMessage';
import { AppSummary } from '../components/AppSummary';
import { ScopesSection } from '../components/ScopesSection';
import { AutoInstallOption } from '../components/AutoInstallOption';
import { Toast } from '../components/Toast';
import { mockManagerApp, mockRequester, mockWorkspace } from '../data/mock-app';

export function SlackbotFlow() {
  const [modalOpen, setModalOpen] = useState(false);
  const [autoInstall, setAutoInstall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleApprove = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalOpen(false);
      const msg = autoInstall
        ? `${mockManagerApp.name} approved. Auto-install rule created for child agent apps.`
        : `${mockManagerApp.name} approved for ${mockWorkspace.name}.`;
      setToastMessage(msg);
      setToastVisible(true);
      setAutoInstall(false);
    }, 1200);
  };

  return (
    <div style={pageStyle}>
      <div style={contextStyle}>
        <div style={contextHeaderStyle}>
          <h3 style={{ margin: 0, fontSize: '16px' }}>Entrypoint 3: Slackbot DM Notification</h3>
          <p style={contextDescStyle}>
            Admin receives a Slackbot DM when a new app request is created. Clicking "Review and Approve for Workspace" opens the approval modal.
          </p>
        </div>
        <div style={slackLayoutStyle}>
          {/* Dark sidebar */}
          <div style={darkSidebarStyle}>
            <div style={sidebarTeamStyle}>
              <span style={teamLogoStyle}>⬡</span>
              <span style={teamNameStyle}>{mockWorkspace.name}</span>
            </div>
            <div style={sidebarNavStyle}>
              <SidebarItem icon="🧵" label="Threads" />
              <SidebarItem icon="💬" label="Huddles" />
              <SidebarItem icon="📋" label="Canvases" />
              <SidebarItem icon="⋯" label="More" />
            </div>
            <div style={sidebarDividerStyle} />
            <div style={sidebarSectionStyle}>
              <span style={sidebarSectionTitleStyle}>Saved</span>
              <div style={savedItemStyle}>Drag and drop important stuff here</div>
            </div>
            <div style={sidebarDividerStyle} />
            <div style={sidebarSectionStyle}>
              <span style={sidebarSectionTitleStyle}>Channels</span>
            </div>
            <div style={sidebarDividerStyle} />
            <div style={sidebarSectionStyle}>
              <span style={sidebarSectionTitleStyle}>Direct messages</span>
              <SidebarDM label="Slackbot" active />
            </div>
          </div>
          {/* Message area */}
          <div style={messageAreaStyle}>
            <div style={channelHeaderStyle}>
              <span style={channelNameStyle}>
                <img
                  src="https://api.dicebear.com/7.x/bottts/svg?seed=slackbot&backgroundColor=ffd700"
                  alt="Slackbot"
                  style={{ width: '20px', height: '20px', borderRadius: '4px', marginRight: '6px', verticalAlign: 'middle' }}
                />
                Slackbot
              </span>
              <div style={channelTabsStyle}>
                <span style={channelTabActiveStyle}>Messages</span>
                <span style={channelTabStyle}>History</span>
                <span style={channelTabStyle}>Skills</span>
              </div>
            </div>
            <div style={messagesContainerStyle}>
              <SlackbotMessage
                appName={mockManagerApp.name}
                appIcon={mockManagerApp.icon}
                requesterName={mockRequester.name}
                requesterAvatar={mockRequester.avatar}
                botScopes={mockManagerApp.botScopes}
                userScopes={mockManagerApp.userScopes}
                workspaceName={mockWorkspace.name}
                stepsIncluded={mockManagerApp.stepsIncluded}
                onApproveClick={() => setModalOpen(true)}
                onRestrictClick={() => {}}
              />
            </div>
            <div style={footerBannerStyle}>
              This conversation hosts automated updates from Slackbot. <span style={{ color: '#1264a3', cursor: 'pointer' }}>Start a new conversation</span>
            </div>
          </div>
        </div>
      </div>

      <SlackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Approve this app for installation?"
        footer={
          <>
            <SlackButton variant="outline" onClick={() => setModalOpen(false)}>Cancel</SlackButton>
            <SlackButton variant="primary" loading={loading} onClick={handleApprove}>Approve</SlackButton>
          </>
        }
      >
        <ModalSection>
          <AppSummary
            name={mockManagerApp.name}
            icon={mockManagerApp.icon}
            developer={mockManagerApp.developer}
          />
        </ModalSection>
        <ModalSection>
          <ScopesSection
            botScopes={mockManagerApp.botScopes}
            userScopes={mockManagerApp.userScopes}
          />
        </ModalSection>
        <ModalSection borderBottom={false}>
          <AutoInstallOption
            checked={autoInstall}
            onChange={setAutoInstall}
            appName={mockManagerApp.name}
          />
        </ModalSection>
      </SlackModal>

      <Toast
        message={toastMessage}
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </div>
  );
}

function SidebarItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={sidebarItemStyle}>
      <span style={{ fontSize: '14px' }}>{icon}</span>
      <span style={{ fontSize: '13px' }}>{label}</span>
    </div>
  );
}

function SidebarDM({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div style={{
      ...sidebarItemStyle,
      backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
      fontWeight: active ? 600 : 400,
    }}>
      <span style={{ width: '16px', height: '16px', borderRadius: '3px', backgroundColor: '#ffd700', display: 'inline-block', fontSize: '10px', lineHeight: '16px', textAlign: 'center' }}>🤖</span>
      <span style={{ fontSize: '13px' }}>{label}</span>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  padding: '40px 24px',
  maxWidth: '960px',
  margin: '0 auto',
};

const contextStyle: React.CSSProperties = {
  backgroundColor: 'var(--sk-color-bg-primary)',
  borderRadius: 'var(--sk-radius-lg)',
  border: '1px solid var(--sk-color-border-light)',
  overflow: 'hidden',
};

const contextHeaderStyle: React.CSSProperties = {
  padding: '20px 24px',
  borderBottom: '1px solid var(--sk-color-border-light)',
};

const contextDescStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-secondary)',
  marginTop: '4px',
};

const slackLayoutStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '480px',
};

const darkSidebarStyle: React.CSSProperties = {
  width: '200px',
  backgroundColor: '#4a154b',
  color: 'rgba(255,255,255,0.9)',
  padding: '12px 0',
};

const sidebarTeamStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  marginBottom: '8px',
};

const teamLogoStyle: React.CSSProperties = {
  fontSize: '16px',
};

const teamNameStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '14px',
};

const sidebarNavStyle: React.CSSProperties = {
  padding: '0 8px',
};

const sidebarItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '4px 8px',
  borderRadius: '4px',
  color: 'rgba(255,255,255,0.8)',
  cursor: 'pointer',
};

const sidebarDividerStyle: React.CSSProperties = {
  height: '1px',
  backgroundColor: 'rgba(255,255,255,0.15)',
  margin: '8px 16px',
};

const sidebarSectionStyle: React.CSSProperties = {
  padding: '0 8px',
};

const sidebarSectionTitleStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.6)',
  padding: '4px 8px',
  display: 'block',
};

const savedItemStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'rgba(255,255,255,0.4)',
  padding: '4px 8px',
  fontStyle: 'italic',
};

const messageAreaStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const channelHeaderStyle: React.CSSProperties = {
  padding: '12px 20px',
  borderBottom: '1px solid var(--sk-color-border-light)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const channelNameStyle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
};

const channelTabsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '16px',
};

const channelTabActiveStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--sk-color-text-primary)',
  borderBottom: '2px solid var(--sk-color-primary)',
  paddingBottom: '2px',
};

const channelTabStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-secondary)',
  cursor: 'pointer',
};

const messagesContainerStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '16px 0',
};

const footerBannerStyle: React.CSSProperties = {
  padding: '10px 20px',
  borderTop: '1px solid var(--sk-color-border-light)',
  fontSize: '12px',
  color: 'var(--sk-color-text-secondary)',
  textAlign: 'center',
  backgroundColor: 'var(--sk-color-bg-secondary)',
};
