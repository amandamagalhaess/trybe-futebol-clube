import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import AuthValidation from '../middlewares/AuthValidation';
import MatchMiddleware from '../middlewares/MatchMiddleware';

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

  withFinishMatch() {
    this.router.patch(
      '/:id/finish',
      AuthValidation.validateToken,
      (req, res) => this.matchController.finishMatch(req, res),
    );
    return this;
  }

  withUpdateMatch() {
    this.router.patch(
      '/:id',
      AuthValidation.validateToken,
      (req, res) => this.matchController.updateMatch(req, res),
    );
    return this;
  }

  withCreateMatch() {
    this.router.post(
      '/',
      AuthValidation.validateToken,
      MatchMiddleware.matchValidation,
      (req, res) => this.matchController.createMatch(req, res),
    );
    return this;
  }

  build() {
    return this.router;
  }
}
