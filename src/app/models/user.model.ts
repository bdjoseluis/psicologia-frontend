export interface User {
  id?: number;
  username: string;
  password?: string;
  name?: string;
  email?: string;
  genero?: string;
  age?: number;
  image?: string;
  creationDate?: Date;
  lastLogin?: Date;
  active?: boolean;
  roles?: Role[];
}

export interface Role {
  id?: number;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface RegisterRequest {
  username?: string;
  password: string;
  name?: string;
  email: string;
} 