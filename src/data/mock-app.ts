export interface ScopeInfo {
  name: string;
  description: string;
}

export const mockManagerApp = {
  id: 'A06K2PQ4R8J',
  name: 'Acme Agent Platform',
  description: 'Enterprise AI agent orchestration platform that creates and manages specialized agent apps for your workspace.',
  icon: 'https://api.dicebear.com/7.x/shapes/svg?seed=acme&backgroundColor=7c3aed&shape1Color=ffffff',
  developer: 'Acme Corp',
  botScopes: [
    { name: 'app_configurations:write', description: 'Create, edit, and manage app configurations and child apps' },
    { name: 'chat:write', description: 'Send messages as the app' },
    { name: 'channels:read', description: 'View basic information about public channels in a workspace' },
    { name: 'users:read', description: 'View people in a workspace' },
    { name: 'commands', description: 'Add shortcuts and/or slash commands that people can use' },
    { name: 'im:write', description: 'Start direct messages with people' },
  ] as ScopeInfo[],
  userScopes: [
    { name: 'identity', description: 'View information about a user\'s identity' },
    { name: 'users.profile:read', description: 'Edit a user\'s profile information and status' },
  ] as ScopeInfo[],
  stepsIncluded: true,
  hasAutoInstallScope: true,
};

export const mockRequester = {
  name: 'Sarah Chen',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  title: 'Engineering Manager',
};

export const mockWorkspace = {
  name: 'corp',
  id: 'T024BE7LD',
};

export const mockOrg = {
  name: 'Acme Corp Enterprise',
  id: 'E024BE7LD',
  workspaceCount: 12,
};
