// Pages untuk routing
export { default as SignInPage } from './presentation/pages/SignInPage';
export { default as SignUpPage } from './presentation/pages/SignUpPage';
export { default as VerifyOtpPage } from './presentation/pages/VerifyOtpPage';
export { default as ResetPasswordPage } from './presentation/pages/ResetPasswordPage';

// Hook untuk dipakai komponen lain (mis. ProtectedOutlet, UserDropdown)
export { UseAuth } from './presentation/hooks/UseAuth';

// Entities untuk shared types
export type { User, AuthSession, LoginCredentials, RegisterPayload } from './domain/entities/User';

// Utilitas cek status login tanpa perlu render hook (dipakai di luar komponen React)
export { isAuthenticated } from '@/services/api';
