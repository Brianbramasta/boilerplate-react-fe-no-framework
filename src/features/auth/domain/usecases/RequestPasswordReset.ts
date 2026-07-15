import { AuthRepository } from '../entities/User';

export const RequestPasswordReset = (repository: AuthRepository) => {
  return async (email: string): Promise<void> => {
    if (!email || !email.includes('@')) {
      throw new Error('Email tidak valid');
    }
    return await repository.RequestPasswordReset(email);
  };
};
