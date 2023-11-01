import * as sinon from 'sinon';
import * as chai from 'chai';
import { App } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { user, validLoginBody, invalidLoginBodyWithoutPassword, invalidLoginBodyWithoutEmail } from './mocks/Users.mock';

// @ts-ignore
import chaiHttp = require('chai-http');
import AuthValidation from '../middlewares/AuthValidation';

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

  it('should return a bad request error if email is not provided', async () => {
    const { status, body } = await chai.request(app).post('/login').send(invalidLoginBodyWithoutEmail);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return a bad request error if password is not provided', async () => {
    const { status, body } = await chai.request(app).post('/login').send(invalidLoginBodyWithoutPassword);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return an unauthorized error if email or password is invalid', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return a role when authenticated with valid credentials', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { body } = await chai.request(app).post('/login').send(validLoginBody);

    const { status, body: { role } } = await chai.request(app).get('/login/role').set('authorization', `Bearer ${body.token}`);

    expect(status).to.equal(200);
    expect(role).to.equal(user.role);
  });

  it('should return a unauthorized error if token is invalid', async () => {
    const { status, body } = await chai.request(app).get('/login/role').set('authorization', `Bearer invalid_token`);
    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('should return a unauthorized error if token is not provided', async () => {
    const {status, body} = await chai.request(app).get('/login/role/');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });

  afterEach(() => {
    sinon.restore();
  });
})