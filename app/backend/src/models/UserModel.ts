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
}
