import { IUser } from 'src/user/domain/interface/user.interface';

export interface IProject {
  id?: string;
  name: string;
  description: string;
  owner: IUser['id'];
}
