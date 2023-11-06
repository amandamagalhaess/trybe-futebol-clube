import { ServiceMessage } from '../ServiceResponse';
import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByFilter(filter: { inProgress?: boolean }): Promise<IMatch[]>;
  finishMatch(matchId: number): Promise<ServiceMessage>;
}
