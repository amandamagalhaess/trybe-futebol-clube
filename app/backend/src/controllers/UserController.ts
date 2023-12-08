import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private userService = new UserService()) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.userService.login(email, password);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getRole(_req: Request, res: Response) {
    const { id } = res.locals.user;
    const serviceResponse = await this.userService.getRole(id);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
