import { IUser } from 'src/user/domain/interface/user.interface';
import { UserRepository } from 'src/user/domain/repository/user.repository';

export class InMemoryUserAdapter implements UserRepository {
  private readonly users: Map<string, IUser> = new Map<string, IUser>();

  async save(user: IUser): Promise<void> {
    this.users.set(user.id, user);
  }

  async getByUsername(username: string): Promise<IUser> {
    let user: IUser | null = null;
    this.users.forEach((u) => {
      if (u.username === username) {
        user = u;
      }
    });

    return user;
  }
}
