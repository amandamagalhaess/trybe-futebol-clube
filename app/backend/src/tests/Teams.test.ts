import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams, team } from './mocks/Teams.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

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

  it('should return a not found error if team doesn\'t exists', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get(`/teams/${team.id}`);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Team not found' });
  });
  
  afterEach(() => {
    sinon.restore();
  });
})