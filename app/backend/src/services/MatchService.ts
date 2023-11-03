import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: allMatches };
  }
}