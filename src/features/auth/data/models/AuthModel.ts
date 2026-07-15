export interface UserDTO {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponseDTO {
  user: UserDTO;
  access_token: string;
  refresh_token?: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
