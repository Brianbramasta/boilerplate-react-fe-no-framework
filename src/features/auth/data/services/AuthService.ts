import apiService from '@/services/api';
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO } from '../models/AuthModel';

export const LoginService = async (payload: LoginRequestDTO): Promise<LoginResponseDTO> => {
  const response = await apiService.post<LoginResponseDTO>('/auth/login', payload, {
    showNotification: false,
  });
  return response.data;
};

export const RegisterService = async (payload: RegisterRequestDTO): Promise<LoginResponseDTO> => {
  const response = await apiService.post<LoginResponseDTO>('/auth/register', payload, {
    showNotification: false,
  });
  return response.data;
};

export const VerifyOtpService = async (code: string): Promise<void> => {
  await apiService.post('/auth/verify-otp', { code }, { showNotification: false });
};

export const RequestPasswordResetService = async (email: string): Promise<void> => {
  await apiService.post('/auth/forgot-password', { email }, { showNotification: false });
};

export const LogoutService = async (): Promise<void> => {
  await apiService.post('/auth/logout', undefined, { showNotification: false });
};
