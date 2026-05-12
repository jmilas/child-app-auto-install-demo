import React, { useState } from 'react';
import { SlackModal, ModalSection } from '../components/SlackModal';
import { SlackButton } from '../components/SlackButton';
import { AppSummary } from '../components/AppSummary';
import { ScopesSection } from '../components/ScopesSection';
import { AutoInstallOption } from '../components/AutoInstallOption';
import { Toast } from '../components/Toast';
import { mockManagerApp, mockRequester, mockWorkspace } from '../data/mock-app';

export function WorkspaceApproval() {
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
          <h3 style={{ margin: 0, fontSize: '16px' }}>Entrypoint 1: Workspace App Management Page</h3>
          <p style={contextDescStyle}>
            Admin navigates to <strong>Settings &gt; Manage Apps &gt; Requests</strong> and clicks to review a pending app request.
          </p>
        </div>
        <div style={adminLayoutStyle}>
          {/* Sidebar */}
          <div style={sidebarStyle}>
            <div style={sidebarHeaderStyle}>
              <div style={sidebarLogoStyle}>
                <img src={mockManagerApp.icon} alt="" style={{ width: '36px', height: '36px', borderRadius: '4px' }} />
              </div>
              <span style={sidebarTeamNameStyle}>{mockWorkspace.name}</span>
            </div>
            <div style={sidebarNavStyle}>
              <NavItem icon="🏠" label="Welcome to Grid" />
              <NavItem icon="🏠" label="Home" />
              <div style={navSpacerStyle} />
              <NavItem icon="💬" label="Messaging" />
              <NavItem icon="👥" label="People" />
              <NavItem icon="🔒" label="About" />
              <div style={navSpacerStyle} />
              <div style={navGroupLabelStyle}>Integrations</div>
              <NavItem label="Requests" active />
              <NavItem label="Directories" />
              <NavItem label="Installed apps" />
              <NavItem label="Workflow" />
              <NavItem label="Salesforce: events, triggers, &" />
              <NavItem label="Recommended apps" />
              <NavItem label="Permissions" />
              <div style={navSpacerStyle} />
              <NavItem icon="📡" label="Channels" />
              <div style={navSpacerStyle} />
              <NavItem icon="🔗" label="Slack Connect" />
            </div>
          </div>
          {/* Main content */}
          <div style={mainContentStyle}>
            <div style={pageHeaderRowStyle}>
              <div>
                <h2 style={pageTitleStyle}>Requests</h2>
                <p style={pageDescStyle}>
                  You can manually review requests, or set up automation rules for new requests that come in.<br />
                  These rules run in the order listed on screen.
                </p>
              </div>
              <button style={manageAppsBtnStyle}>Manage Apps ▾</button>
            </div>

            <div style={tabBarStyle}>
              <span style={activeTabStyle}>Ready to review</span>
              <span style={tabItemStyle}>Automation rules</span>
              <span style={tabItemStyle}>Scope settings</span>
            </div>

            <div style={subBarStyle}>
              <span style={resultCountStyle}>1 request</span>
              <span style={cancelLinkStyle}>Cancel all requests</span>
              <span style={{ flex: 1 }} />
              <span style={filterLinkStyle}>Filter ▾</span>
            </div>

            <div style={tableStyle}>
              <div style={tableHeaderStyle}>
                <span style={{ ...thCellStyle, flex: 2 }}>Name</span>
                <span style={{ ...thCellStyle, flex: 1.5 }}>Developer</span>
                <span style={{ ...thCellStyle, flex: 0.7 }}>Scopes</span>
                <span style={{ ...thCellStyle, flex: 1.2 }}>Requested by</span>
                <span style={{ ...thCellStyle, flex: 1.5 }}>Previous resolution</span>
                <span style={{ ...thCellStyle, flex: 1.2 }}>Date requested</span>
              </div>
              <div style={tableRowStyle} onClick={() => setModalOpen(true)}>
                <div style={{ ...tdCellStyle, flex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" style={{ accentColor: '#1264a3' }} />
                  <img src={mockManagerApp.icon} alt="" style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
                  <span style={appNameLinkStyle}>{mockManagerApp.name}</span>
                  <button style={moreBtnStyle}>•••</button>
                </div>
                <span style={{ ...tdCellStyle, flex: 1.5 }}>Acme Corp</span>
                <span style={{ ...tdCellStyle, flex: 0.7 }}>{mockManagerApp.botScopes.length}</span>
                <span style={{ ...tdCellStyle, flex: 1.2 }}>{mockRequester.name}</span>
                <span style={{ ...tdCellStyle, flex: 1.5 }}>—</span>
                <span style={{ ...tdCellStyle, flex: 1.2 }}>2026-05-11</span>
              </div>
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

function NavItem({ label, icon, active = false }: { label: string; icon?: string; active?: boolean }) {
  return (
    <div style={{
      padding: '4px 12px',
      fontSize: '13px',
      color: active ? 'var(--sk-color-primary)' : 'var(--sk-color-text-secondary)',
      fontWeight: active ? 700 : 400,
      cursor: 'pointer',
      borderRadius: '4px',
      marginBottom: '1px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    }}>
      {icon && <span style={{ fontSize: '12px' }}>{icon}</span>}
      {label}
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  padding: '40px 24px',
  maxWidth: '1100px',
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

const adminLayoutStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '360px',
};

const sidebarStyle: React.CSSProperties = {
  width: '200px',
  borderRight: '1px solid var(--sk-color-border-light)',
  padding: '12px 8px',
  backgroundColor: '#fafafa',
  overflowY: 'auto',
};

const sidebarHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  marginBottom: '8px',
};

const sidebarLogoStyle: React.CSSProperties = {};

const sidebarTeamNameStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: '14px',
};

const sidebarNavStyle: React.CSSProperties = {};

const navGroupLabelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: 'var(--sk-color-text-tertiary)',
  padding: '8px 12px 4px',
};

const navSpacerStyle: React.CSSProperties = {
  height: '8px',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
  padding: '20px 28px',
  overflowX: 'auto',
};

const pageHeaderRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '16px',
};

const pageTitleStyle: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 900,
  margin: '0 0 4px',
};

const pageDescStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-secondary)',
  margin: 0,
  lineHeight: '1.5',
};

const manageAppsBtnStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--sk-color-border-medium)',
  borderRadius: '4px',
  padding: '6px 12px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  color: 'var(--sk-color-text-primary)',
  whiteSpace: 'nowrap',
};

const tabBarStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  borderBottom: '1px solid var(--sk-color-border-light)',
  marginBottom: '12px',
};

const activeTabStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  color: 'var(--sk-color-text-primary)',
  borderBottom: '2px solid var(--sk-color-text-primary)',
  paddingBottom: '8px',
  cursor: 'pointer',
};

const tabItemStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-secondary)',
  paddingBottom: '8px',
  cursor: 'pointer',
};

const subBarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '8px',
};

const resultCountStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-primary)',
  fontWeight: 600,
};

const cancelLinkStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#1264a3',
  cursor: 'pointer',
};

const filterLinkStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-secondary)',
  cursor: 'pointer',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
};

const tableHeaderStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  padding: '8px 0',
  borderBottom: '2px solid var(--sk-color-border-light)',
};

const thCellStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  color: 'var(--sk-color-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
};

const tableRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
  padding: '12px 0',
  alignItems: 'center',
  cursor: 'pointer',
  borderBottom: '1px solid var(--sk-color-border-light)',
};

const tdCellStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--sk-color-text-secondary)',
};

const appNameLinkStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#1264a3',
  cursor: 'pointer',
};

const moreBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '14px',
  color: 'var(--sk-color-text-tertiary)',
  cursor: 'pointer',
  padding: '2px 4px',
  letterSpacing: '1px',
};
