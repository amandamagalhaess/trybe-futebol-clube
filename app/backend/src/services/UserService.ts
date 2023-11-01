import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import { IToken } from '../Interfaces/users/IToken';

export default class UserService {
  constructor(private userModel = new UserModel()) { }

  public async login(email: string, password: string): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.findByEmail(email);

    if (!user || !await bcrypt.compare(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwt.sign({
      id: user.id,
    }, process.env.JWT_SECRET || 'secret');

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(userId: number): Promise<ServiceResponse<{ role: string }>> {
    const role = await this.userModel.getRole(userId);

    return { status: 'SUCCESSFUL', data: { role } };
  }
}
