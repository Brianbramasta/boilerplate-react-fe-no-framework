import { AuthRepository } from '../entities/User';

export const VerifyOtp = (repository: AuthRepository) => {
  return async (code: string): Promise<void> => {
    if (!code || code.length !== 6) {
      throw new Error('Kode OTP harus 6 digit');
    }
    return await repository.VerifyOtp(code);
  };
};
