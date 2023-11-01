import { Router } from 'express';
import UserController from '../controllers/UserController';

export default class UserRouter {
  private router: Router;
  private userController = new UserController();

  constructor() {
    this.router = Router();
  }

  withLogin() {
    this.router.post('/', (req, res) => this.userController.login(req, res));
    return this;
  }

  build() {
    return this.router;
  }
}
