import { AuthRepository, AuthSession, RegisterPayload } from '../entities/User';

export const Register = (repository: AuthRepository) => {
  return async (payload: RegisterPayload): Promise<AuthSession> => {
    if (!payload.email || !payload.email.includes('@')) {
      throw new Error('Email tidak valid');
    }
    if (!payload.password || payload.password.length < 8) {
      throw new Error('Password minimal 8 karakter');
    }
    if (!payload.firstName) {
      throw new Error('Nama depan wajib diisi');
    }
    return await repository.Register(payload);
  };
};
