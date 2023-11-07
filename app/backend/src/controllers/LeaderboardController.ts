import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardHomeController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public async getLeaderboardHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardHome();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
