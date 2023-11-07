import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeUser from '../database/models/SequelizeUser';
import { matches, match, newMatch, matchRequest, matchRequestWithEqualTeams } from './mocks/Matches.mock';
import { user, validLoginBody } from './mocks/Users.mock';

// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Matches Test', async () => {
  it('should return all matches', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should return filtered matches', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should finish match', async () => {
    sinon.stub(SequelizeMatch, 'findOne').resolves(match as any);
    sinon.stub(SequelizeMatch, 'update').resolves([1]);
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    const { body: {token} } = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('authorization', `Bearer ${token}`);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });

  it('should not finish match', async () => {
    sinon.stub(SequelizeMatch, 'findOne').resolves(null);
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    const { body: {token} } = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('authorization', `Bearer ${token}`);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Match not found' });
  });

  it('should update match', async () => {
    sinon.stub(SequelizeMatch, 'findOne').resolves(match as any);
    sinon.stub(SequelizeMatch, 'update').resolves([1]);
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    const { body: {token} } = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body } = await chai.request(app).patch('/matches/1').send({ homeTeamScore: 1, awayTeamScore: 2 })
    .set('Authorization', `Bearer ${token}`);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Updated' });
  });

  it('should not update match', async () => {
    sinon.stub(SequelizeMatch, 'findOne').resolves(null);
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    const { body: {token} } = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body } = await chai.request(app).patch('/matches/1').send({ homeTeamScore: 1, awayTeamScore: 2 })
    .set('Authorization', `Bearer ${token}`);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Match not found' });
  });

  it('should create a match', async () => {
    sinon.stub(SequelizeMatch, 'create').resolves(newMatch as any);
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    const { body: {token} } = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body } = await chai.request(app).post('/matches').send(matchRequest).set('Authorization', `Bearer ${token}`);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(newMatch);
  });

  it('should not create a match with two equal teams', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    const { body: {token} } = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body } = await chai.request(app).post('/matches').send(matchRequestWithEqualTeams).set('Authorization', `Bearer ${token}`);

    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('should not create a match with invalid teams', async () => {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    const { body: {token} } = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body } = await chai.request(app).post('/matches').send(matchRequest).set('Authorization', `Bearer ${token}`);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'There is no team with such id!' });
  });

  afterEach(() => {
    sinon.restore();
  });
});