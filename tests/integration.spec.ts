// import 'jest';
// import * as express from 'express';

import supertest from 'supertest';
import { Express } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { app, mongoose, server } from '../src/app';

const request = supertest(app);

describe('status integration tests', () => {
  beforeAll(async () => { });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  it('can get server time', async () => {
    await request
      .get('/issue')
      .set('Accept', 'application/json')
      .expect((res: Response) => {
        // eslint-disable-next-line no-console
        console.log(res.body);
      })
      .expect(StatusCodes.OK);
  });

  // it('can get server system info', async () => {
  //   await request(app)
  //     .get('/api/status/system')
  //     .set('Accept', 'application/json')
  //     .expect(StatusCodes.OK);
  // });

  // it('can get server system usage', async () => {
  //   await request(app)
  //     .get('/api/status/usage')
  //     .set('Accept', 'application/json')
  //     .expect(StatusCodes.OK);
  // });

  // it('can get server system process info', async () => {
  //   await request(app)
  //     .get('/api/status/process')
  //     .set('Accept', 'application/json')
  //     .expect(StatusCodes.OK);
  // });

  // it('should get the error', async () => {
  //   await request(app)
  //     .get('/api/status/error')
  //     .set('Accept', 'application/json')
  //     .expect(StatusCodes.BAD_REQUEST);
  // });
});