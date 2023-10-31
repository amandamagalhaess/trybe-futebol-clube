import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
