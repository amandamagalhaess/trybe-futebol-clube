import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

// @ts-ignore
import chaiHttp = require('chai-http');
import { teams, team } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Teams Test', () => {
  it('should return all teams', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  
  });

  it('should return a team by id', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);

    const { status, body } = await chai.request(app).get(`/teams/${team.id}`);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });
  
  afterEach(() => {
    sinon.restore();
  });
})