import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import app from '../src/app';
import Issue from '../src/models/issue';
import User from '../src/models/user';
import properties from '../src/config/properties';

mongoose.connect(properties.mongoURI);

describe('Testing REST API endpoints (Project)', () => {
  let agent: request.SuperAgentTest;
  let user = { id: '', username: 'name', email: 'name@test.com', password: 'testing' };

  beforeAll(async () => {
    // Create a new test user
    agent = request.agent(app);

    await agent
      .post('/signup')
      .send(user);

    // Authenticate the test user
    const response = await agent
      .post('/authenticate')
      .send({ email: user.email, password: user.password });

    user.id = response.body.id;
  });

  afterAll(async () => {
    await Issue.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test('create a new project owned by a current test user', async () => {
    const response = await agent
      .post('/project')
      .send({ 'name': 'My Project', 'userId': user.id })
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(StatusCodes.OK);
    console.log(response.body);
    expect(response.body).toBeDefined();
  });

  // test('get all project for the test user', async () => {
  //   const response = await agent
  //     .get('/projects/')
  //     .set('Accept', 'application/json')

  //   expect(response.statusCode).toBe(StatusCodes.OK);
  // });

  // test('get an issue by using its identifier', async () => {
  //   const postResponse = await agent
  //     .post('/issue')
  //     .send({ 'title': 'Title', 'content': 'Content' })
  //     .set('Accept', 'application/json')

  //   expect(postResponse.statusCode).toBe(StatusCodes.OK);
  //   expect(postResponse.body.id).toBeDefined();

  //   const getResponse = await agent
  //     .get('/issue/' + postResponse.body.id)
  //     .set('Accept', 'application/json');

  //   expect(getResponse.statusCode).toBe(StatusCodes.OK);
  //   expect(getResponse.body._id).toEqual(postResponse.body.id);
  // });



  // test('post an new issue with invalid data', async () => {
  //   const response = await agent
  //     .post('/issue')
  //     .send({})
  //     .set('Accept', 'application/json');

  //   expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  // });

  // test('update an issue', async () => {
  //   const response = await agent
  //     .post('/issue')
  //     .send({ 'title': 'My Title', 'content': 'My Content' })
  //     .set('Accept', 'application/json');

  //   expect(response.statusCode).toBe(StatusCodes.OK);
  //   expect(response.body.id).toBeDefined();

  //   const newTitle = 'Updated Title';
  //   const newContent = 'Updated Content';

  //   const updateResponse = await agent
  //     .put('/issue/' + response.body.id)
  //     .send({ 'title': newTitle, 'content': newContent })

  //   expect(updateResponse.statusCode).toBe(StatusCodes.OK);
  //   expect(updateResponse.body._id).toBe(response.body.id);
  //   expect(updateResponse.body.title).toBe(newTitle);
  //   expect(updateResponse.body.content).toBe(newContent);
  // });

  // test('delete an issue by using its identifier', async () => {
  //   const postResponse = await agent
  //     .post('/issue')
  //     .send({ 'title': 'My Title', 'content': 'My Content' })
  //     .set('Accept', 'application/json');

  //   expect(postResponse.statusCode).toBe(StatusCodes.OK);
  //   expect(postResponse.body.id).toBeDefined();

  //   const deleteResponse = await agent
  //     .delete('/issue/' + postResponse.body.id)

  //   expect(deleteResponse.statusCode).toBe(StatusCodes.OK);
  // });

  // test('trying to delete an issue without identifier', async () => {
  //   const response = await agent
  //     .delete('/issue/')

  //   expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  // });
});