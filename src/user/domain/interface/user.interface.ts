import { ERole } from '../enum/role.enum';

export interface IUser {
  id: string;
  username: string;
  password: string;
  role: ERole;
}

export interface IUserWithToken {
  id: string;
  username: string;
  token: string;
}
