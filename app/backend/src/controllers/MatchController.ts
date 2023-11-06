import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  public async getAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matchService.getAllMatches();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getMatchesByFilter(req: Request, res: Response) {
    const { inProgress } = req.query;

    const filter: { inProgress?: boolean } = {};

    if (inProgress !== undefined) {
      filter.inProgress = inProgress === 'true';
    }

    const serviceResponse = await this.matchService.getMatchesByFilter(filter);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.finishMatch(Number(id));

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.updateMatch(Number(id), req.body);

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
