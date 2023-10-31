import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
