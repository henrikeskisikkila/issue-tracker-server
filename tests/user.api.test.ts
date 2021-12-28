import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/user';

const keys = require('../src/config/keys');
mongoose.connect(keys.mongoURI);

describe('Testing REST API endpoints (User)', () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test('create a new user', async () => {
    const response = await request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        'username': 'User',
        'email': 'first.last@domain.com',
        'password': 'verysecret'
      });

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.email).toBe('first.last@domain.com');
  });

  test('get user by email', async () => {
    const response = await request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        'username': 'User',
        'email': 'first.last@domain.com',
        'password': 'verysecret'
      });

    expect(response.statusCode).toBe(StatusCodes.OK);

    const getResponse = await request(app)
      .get('/user/first.last@domain.com')
      .set('Accept', 'application/json')

    expect(getResponse.statusCode).toBe(StatusCodes.OK);
    expect(getResponse.body.user.email).toBe('first.last@domain.com');
  });

  test('create a new user with invalid email', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        'username': 'User',
        'email': 'first.lastdomain.com',
        'password': 'verysecret'
      });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test('create a new user with invalid password', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        'username': 'User',
        'email': 'first.last@domain.com',
        'password': 'very'
      });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test('create a new user with invalid username', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        'username': '',
        'email': 'first.last@domain.com',
        'password': 'very'
      });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test('delete an user by using an email', async () => {
    const response = await request(app)
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        'username': 'User',
        'email': 'first@domain.com',
        'password': 'verysecret'
      });

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.email).toBeDefined();

    const deleteResponse = await request(app)
      .delete('/user/' + response.body.email)

    expect(deleteResponse.statusCode).toBe(StatusCodes.OK);

    const getResponse = await request(app)
      .get('/user/first@domain.com')
      .set('Accept', 'application/json')

    expect(getResponse.statusCode).toBe(StatusCodes.OK);
    expect(getResponse.body.user).toBe(null);
  });
});