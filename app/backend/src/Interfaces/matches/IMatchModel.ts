import { ServiceMessage } from '../ServiceResponse';
import { IMatch } from './IMatch';

export type MatchFilter = { inProgress?: boolean };
export type MatchUpdate = { homeTeamGoals: number; awayTeamGoals: number };

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByFilter(filter: MatchFilter): Promise<IMatch[]>;
  finishMatch(matchId: number): Promise<ServiceMessage>;
  updateMatch(matchId: number, body: MatchUpdate): Promise<ServiceMessage>;
  createMatch(match: IMatch): Promise<IMatch>;
}
