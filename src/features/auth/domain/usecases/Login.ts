import { AuthRepository, AuthSession, LoginCredentials } from '../entities/User';

export const Login = (repository: AuthRepository) => {
  return async (credentials: LoginCredentials): Promise<AuthSession> => {
    if (!credentials.email || !credentials.email.includes('@')) {
      throw new Error('Email tidak valid');
    }
    if (!credentials.password) {
      throw new Error('Password wajib diisi');
    }
    return await repository.Login(credentials);
  };
};
