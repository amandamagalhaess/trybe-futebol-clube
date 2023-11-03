import { Router } from 'express';
import MatchController from '../controllers/MatchController';

export default class MatchRouter {
  private router: Router;
  private matchController = new MatchController();

  constructor() {
    this.router = Router();
  }

  withGetAll() {
    this.router.get('/', (req, res) => this.matchController.getAllMatches(req, res));
    return this;
  }

  build() {
    return this.router;
  }
}
