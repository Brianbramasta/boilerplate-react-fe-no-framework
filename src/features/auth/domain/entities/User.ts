export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface AuthRepository {
  Login(credentials: LoginCredentials): Promise<AuthSession>;
  Register(payload: RegisterPayload): Promise<AuthSession>;
  VerifyOtp(code: string): Promise<void>;
  RequestPasswordReset(email: string): Promise<void>;
  Logout(): Promise<void>;
}
