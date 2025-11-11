export interface User {
  id: number;
  username: string;
  lastname: string;
  firstname: string;
  country: string;
  role: 'USER' | 'ADMIN';
  enabled: boolean;
  authorities?: { authority: string }[];
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  accountNonExpired?: boolean;
}

export interface UpdateUserRequest {
  username?: string;
  role?: 'USER' | 'ADMIN';
  enabled?: boolean;
  password?: string;
  firstname?: string;
  lastname?: string;
  country?: string;
}

export interface UpdateUserResponse {
  firstname: string;
  lastname: string;
  country: string;
}