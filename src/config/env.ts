export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? '',
  apiPrefix: import.meta.env.VITE_API_PREFIX ?? '',
  appEnv: import.meta.env.VITE_APP_ENV ?? '',
  adminContact: import.meta.env.VITE_ADMIN_CONTACT ?? '',
};

export default env;
