import { IUser } from '../interface/user.interface';

export abstract class UserRepository {
  abstract save(user: IUser): Promise<void>;
  abstract getByUsername(username: string): Promise<IUser>;
}
