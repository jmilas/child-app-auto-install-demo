import React, { useState } from 'react';
import { NavigationBar, type Screen } from './components/NavigationBar';
import { WorkspaceApproval } from './screens/WorkspaceApproval';
import { OrgApproval } from './screens/OrgApproval';
import { SlackbotFlow } from './screens/SlackbotFlow';

export default function App() {
  const [screen, setScreen] = useState<Screen>('workspace');

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <NavigationBar active={screen} onChange={setScreen} />
      <main style={{ flex: 1 }}>
        {screen === 'workspace' && <WorkspaceApproval />}
        {screen === 'org' && <OrgApproval />}
        {screen === 'slackbot' && <SlackbotFlow />}
      </main>
    </>
  );
}
