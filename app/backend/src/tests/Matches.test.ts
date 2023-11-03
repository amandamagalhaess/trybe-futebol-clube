import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matches, match } from './mocks/Matches.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Matches Test', () => {
  it('should return all matches', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });
});