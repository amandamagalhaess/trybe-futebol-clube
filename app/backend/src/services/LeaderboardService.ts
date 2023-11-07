import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(private leaderboardModel = new LeaderboardModel()) { }

  private transformLeaderboard = (leaderboard: ILeaderboard[]): ILeaderboard[] => {
    const fullLeaderboard = leaderboard.map((item) => ({
      ...item,
      goalsBalance: item.goalsFavor - item.goalsOwn,
      efficiency: ((item.totalPoints / (item.totalGames * 3)) * 100).toFixed(2),
    }));

    return fullLeaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
  };

  async getLeaderboardHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getLeaderboardHome();
    const fullLeaderboard = this.transformLeaderboard(leaderboard);

    return { status: 'SUCCESSFUL', data: fullLeaderboard };
  }

  async getLeaderboardAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getLeaderboardAway();
    const fullLeaderboard = this.transformLeaderboard(leaderboard);

    return { status: 'SUCCESSFUL', data: fullLeaderboard };
  }
}
