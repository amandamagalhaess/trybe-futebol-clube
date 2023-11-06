import MatchModel from '../models/MatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByFilter(
    filter: { inProgress?: boolean },
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
}
