import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import app from '../src/app';
import { User } from '../src/models/user';
import properties from '../src/config/properties';

describe('Testing REST API endpoints (Auth)', () => {
  mongoose.connect(properties.mongoURI);

  const user = {
    username: 'Auth',
    email: 'auth@test.com',
    password: 'testing'
  };

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteOne({ email: user.email });
  });

  test('signup a new user', async () => {
    const response = await request(app)
      .post('/signup')
      .send(user);

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  test('authenticate a user', async () => {
    await request(app)
      .post('/signup')
      .send(user);

    const response = await request(app)
      .post('/authenticate')
      .send(user);

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});