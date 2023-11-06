import { MatchUpdate, MatchFilter } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(private matchModel = new MatchModel(), private teamModel = new TeamModel()) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByFilter(
    filter: MatchFilter,
  ): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findByFilter(filter);

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(matchId: number): Promise<ServiceResponse<ServiceMessage>> {
    const modelResponse = await this.matchModel.finishMatch(matchId);

    if (modelResponse.message !== 'Finished') {
      return { status: 'NOT_FOUND', data: modelResponse };
    }

    return { status: 'SUCCESSFUL', data: modelResponse };
  }

  public async updateMatch(
    matchId: number,
    body: MatchUpdate,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const modelResponse = await this.matchModel.updateMatch(matchId, body);

    if (modelResponse.message !== 'Updated') {
      return { status: 'NOT_FOUND', data: modelResponse };
    }

    return { status: 'SUCCESSFUL', data: modelResponse };
  }

  public async createMatch(match: IMatch): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = match;

    const homeTeam = await this.teamModel.findById(homeTeamId);
    const awayTeam = await this.teamModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const createdMatch = await this.matchModel.createMatch(match);

    return { status: 'SUCCESSFUL', data: createdMatch };
  }
}
