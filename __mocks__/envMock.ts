// Mock for src/config/env to avoid import.meta.env issues in Jest
export const env = {
  apiUrl: 'http://api.test',
  apiPrefix: '/api',
  appEnv: 'test',
  adminContact: '+62 000-0000-0000',
};

export default env;
