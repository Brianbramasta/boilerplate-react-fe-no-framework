import { AuthSession, LoginCredentials, RegisterPayload, User } from '../../domain/entities/User';
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, UserDTO } from './AuthModel';

export const MapToUser = (dto: UserDTO): User => ({
  id: dto.id,
  name: dto.name,
  email: dto.email,
});

export const MapToAuthSession = (dto: LoginResponseDTO): AuthSession => ({
  user: MapToUser(dto.user),
  accessToken: dto.access_token,
  refreshToken: dto.refresh_token,
});

export const MapToLoginRequest = (credentials: LoginCredentials): LoginRequestDTO => ({
  email: credentials.email,
  password: credentials.password,
});

export const MapToRegisterRequest = (payload: RegisterPayload): RegisterRequestDTO => ({
  first_name: payload.firstName,
  last_name: payload.lastName,
  email: payload.email,
  password: payload.password,
});
