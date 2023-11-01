import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { users, user, validLoginBody, invalidLoginBodyWithoutUsername, invalidLoginBodyWithoutPassword } from './mocks/Users.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Test Users', () => {
  it('should return a token when authenticated with valid credentials', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.property('token');
  });

  it('should return a not found error if username doesn\'t exists', async () => {
    const { status, body } = await chai.request(app).post('/login').send(invalidLoginBodyWithoutUsername);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return a not found error if password doesn\'t exists', async () => {
    const { status, body } = await chai.request(app).post('/login').send(invalidLoginBodyWithoutPassword);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  afterEach(() => {
    sinon.restore();
  });
})