import { AuthRepository } from '../entities/User';

export const Logout = (repository: AuthRepository) => {
  return async (): Promise<void> => {
    return await repository.Logout();
  };
};
