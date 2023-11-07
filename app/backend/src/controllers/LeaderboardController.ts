import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardHomeController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public async getLeaderboardHome(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardHome();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getLeaderboardAway(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardAway();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
