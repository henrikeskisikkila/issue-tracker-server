import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import app from '../src/app';
import Issue from '../src/models/issue';

const keys = require('../src/config/keys');
mongoose.connect(keys.mongoURI);

describe('Testing REST API endpoints (User)', () => {

  beforeAll(async () => {
    await Issue.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test.only('get all users', async () => {
    const response = await request(app)
      .get('/user')
      .set('Accept', 'application/json')
    // .expect('Content-Type', /json/)

    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  // test('get an issue by using its identifier', async () => {
  //   const postResponse = await request(app)
  //     .post('/issue')
  //     .send({ 'title': 'Title', 'content': 'Content' })
  //     .set('Accept', 'application/json')

  //   expect(postResponse.statusCode).toBe(StatusCodes.OK);
  //   expect(postResponse.body.id).toBeDefined();

  //   const getResponse = await request(app)
  //     .get('/issue/' + postResponse.body.id)
  //     .set('Accept', 'application/json');

  //   expect(getResponse.statusCode).toBe(StatusCodes.OK);
  //   expect(getResponse.body._id).toEqual(postResponse.body.id);
  // });

  // test('post an new issue', async () => {
  //   const response = await request(app)
  //     .post('/issue')
  //     .send({ 'title': 'My Title', 'content': 'My Content' })
  //     .set('Accept', 'application/json');

  //   expect(response.statusCode).toBe(StatusCodes.OK);
  //   expect(response.body.id).toBeDefined();
  // });

  // test('post an new issue with invalid data', async () => {
  //   const response = await request(app)
  //     .post('/issue')
  //     .send({})
  //     .set('Accept', 'application/json');

  //   expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  // });

  // test('delete an issue by using its identifier', async () => {
  //   const postResponse = await request(app)
  //     .post('/issue')
  //     .send({ 'title': 'My Title', 'content': 'My Content' })
  //     .set('Accept', 'application/json');

  //   expect(postResponse.statusCode).toBe(StatusCodes.OK);
  //   expect(postResponse.body.id).toBeDefined();

  //   const deleteResponse = await request(app)
  //     .delete('/issue/' + postResponse.body.id)

  //   expect(deleteResponse.statusCode).toBe(StatusCodes.OK);
  // });

  // test('trying to delete an issue without identifier', async () => {
  //   const response = await request(app)
  //     .delete('/issue/')

  //   expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  // });
});