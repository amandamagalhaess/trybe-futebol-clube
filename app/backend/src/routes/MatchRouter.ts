import { Router } from 'express';
import MatchController from '../controllers/MatchController';

export default class MatchRouter {
  private router: Router;
  private matchController = new MatchController();

  constructor() {
    this.router = Router();
  }

  withGetAll() {
    this.router.get('/', (req, res) => {
      if (req.query.inProgress) {
        this.matchController.getMatchesByFilter(req, res);
      } else {
        this.matchController.getAllMatches(req, res);
      }
    });
    return this;
  }

  build() {
    return this.router;
  }
}
