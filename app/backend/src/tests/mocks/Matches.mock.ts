const match = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: "São Paulo"
  },
  awayTeam: {
    teamName: "Grêmio"
  }
}

const matches = [match];

const newMatch = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true
}

const matchRequest = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const matchRequestWithEqualTeams = {
  homeTeamId: 16,
  awayTeamId: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

export { match, matches, newMatch, matchRequest, matchRequestWithEqualTeams };