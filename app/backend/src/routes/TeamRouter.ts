import { Router } from 'express';
import TeamController from '../controllers/TeamController';

export default class TeamRouter {
  private router: Router;
  private teamController = new TeamController();

  constructor() {
    this.router = Router();
  }

  withGetAll() {
    this.router.get('/', (req, res) => this.teamController.getAllTeams(req, res));
    return this;
  }

  build() {
    return this.router;
  }
}
