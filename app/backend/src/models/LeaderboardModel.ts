import TeamModel from './TeamModel';
import MatchModel from './MatchModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardModel {
  constructor(private matchModel = new MatchModel(), private teamModel = new TeamModel()) { }

  async getFinishedMatches() {
    const matches = await this.matchModel.findByFilter({ inProgress: false });
    return matches;
  }

  async getTeams() {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const leaderboard = (await this.getTeams()).map(async (team) => {
      const teamMatches = (await this.getFinishedMatches())
        .filter((match) => match.homeTeamId === team.id);

      const wins = teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
      const draws = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
      const losses = teamMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

      return {
        name: team.teamName,
        totalPoints: wins.length * 3 + draws.length,
        totalGames: teamMatches.length,
        totalVictories: wins.length,
        totalDraws: draws.length,
        totalLosses: losses.length,
        goalsFavor: teamMatches.reduce((total, match) => total + match.homeTeamGoals, 0),
        goalsOwn: teamMatches.reduce((total, match) => total + match.awayTeamGoals, 0),
      };
    });

    return Promise.all(leaderboard);
  }
}
