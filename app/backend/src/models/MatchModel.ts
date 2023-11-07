import { ServiceMessage } from '../Interfaces/ServiceResponse';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel, MatchFilter, MatchUpdate } from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async findByFilter(filter: MatchFilter): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: filter,
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async findById(matchId: number): Promise<IMatch | null> {
    const dbData = await this.model.findOne({
      where: { id: matchId },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async finishMatch(matchId: number): Promise<ServiceMessage> {
    const match = await this.findById(matchId);

    if (match) {
      await this.model.update({ inProgress: false }, { where: { id: matchId } });
      return { message: 'Finished' };
    }
    return { message: 'Match not found' };
  }

  async updateMatch(matchId: number, body: MatchUpdate): Promise<ServiceMessage> {
    const match = await this.findById(matchId);

    if (match) {
      await this.model.update(body, { where: { id: matchId } });
      return { message: 'Updated' };
    }
    return { message: 'Match not found' };
  }

  async createMatch(match: IMatch): Promise<IMatch> {
    const newMatch = await this.model.create(match);

    return newMatch;
  }
}
