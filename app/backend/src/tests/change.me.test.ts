import * as chai from 'chai';
import { App } from '../app';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing route /', () => {

  const app = new App().app

    it('Test if the route / is working', async () => {
      const res = await chai.request(app).get('/');
      expect(res.body).to.deep.equal({ ok: true });
    });
  });