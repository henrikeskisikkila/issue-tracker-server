import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import app from '../src/app';
import { Issue } from '../src/models/issue';

const keys = require('../src/config/keys');
mongoose.connect(keys.mongoURI);

describe('Testing all REST API endpoints', () => {

  beforeAll(async () => {
    await Issue.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Get all issues', async () => {
    await request(app)
      .get('/issue')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(StatusCodes.OK);
  });
});