import { AuthRepository, LoginCredentials, RegisterPayload } from '../../domain/entities/User';
import {
  LoginService,
  LogoutService,
  RegisterService,
  RequestPasswordResetService,
  VerifyOtpService,
} from '../services/AuthService';
import { MapToAuthSession, MapToLoginRequest, MapToRegisterRequest } from '../models/AuthMapper';

export const AuthRepositoryImpl: AuthRepository = {
  Login: async (credentials: LoginCredentials) => {
    const dto = await LoginService(MapToLoginRequest(credentials));
    return MapToAuthSession(dto);
  },

  Register: async (payload: RegisterPayload) => {
    const dto = await RegisterService(MapToRegisterRequest(payload));
    return MapToAuthSession(dto);
  },

  VerifyOtp: async (code: string) => {
    await VerifyOtpService(code);
  },

  RequestPasswordReset: async (email: string) => {
    await RequestPasswordResetService(email);
  },

  Logout: async () => {
    await LogoutService();
  },
};
