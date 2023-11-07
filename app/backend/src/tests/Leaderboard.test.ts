import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import LeaderboardModel from '../models/LeaderboardModel';
import { leaderboardHome, leaderboardAway, fullLeaderboardHome, fullLeaderboardAway, fullLeaderboard } from './mocks/Leaderboard.mock';

// @ts-ignore
import chaiHttp = require('chai-http');
import LeaderboardService from '../services/LeaderboardService';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Leaderboard Test', async () => {
  it('should return leaderboard home', async () => {
    sinon.stub(LeaderboardModel.prototype, 'getLeaderboardHome').resolves(leaderboardHome as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(fullLeaderboardHome);
  });

  it('should return leaderboard away', async () => {
    sinon.stub(LeaderboardModel.prototype, 'getLeaderboardAway').resolves(leaderboardAway as any);

    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(fullLeaderboardAway);
  });

  it('should return leaderboard general', async () => {
    sinon.stub(LeaderboardModel.prototype, 'getLeaderboardHome').resolves(leaderboardHome as any);
    sinon.stub(LeaderboardModel.prototype, 'getLeaderboardAway').resolves(leaderboardAway as any);

    const { status, body } = await chai.request(app).get('/leaderboard');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(fullLeaderboard);
  });

  afterEach(() => {
    sinon.restore();
  });
});