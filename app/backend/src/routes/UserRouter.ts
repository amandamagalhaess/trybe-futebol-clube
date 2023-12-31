import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';
import AuthValidation from '../middlewares/AuthValidation';

export default class UserRouter {
  private router: Router;
  private userController = new UserController();

  constructor() {
    this.router = Router();
  }

  withLogin() {
    this.router.post(
      '/',
      UserMiddleware.verifyIfEmailAndPasswordExists,
      UserMiddleware.verifyIfEmailAndPasswordAreValid,
      (req, res) => this.userController.login(req, res),
    );
    return this;
  }

  withGetRole() {
    this.router.get(
      '/role',
      AuthValidation.validateToken,
      (req, res) => this.userController.getRole(req, res),
    );
    return this;
  }

  build() {
    return this.router;
  }
}
