/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_PREFIX: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_ADMIN_CONTACT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
