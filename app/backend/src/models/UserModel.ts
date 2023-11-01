import { IUser } from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const { id, username, role, password }: IUser = user;
    return { id, username, role, email, password };
  }

  async getRole(id: number): Promise<string> {
    const user = await this.model.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user.role;
  }
}
