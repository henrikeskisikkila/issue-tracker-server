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
      .send({ 'name': 'My Project', 'createdBy': user.id })
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body).toBeDefined();
    expect(response.body.createdBy.toString()).toBe(user.id);
    console.log(response.body);
  });

  test('update a project', async () => {
    const postResponse = await agent
      .post('/project')
      .send({ 'name': 'My Project', 'createdBy': user.id })
      .set('Accept', 'application/json');

    expect(postResponse.body.createdBy.toString()).toBe(user.id);

    console.log(postResponse.body._id.toString())

    const newName = 'Updated Name';
    const newDescription = 'Updated Description';

    const response = await agent
      .put('/project/' + postResponse.body._id.toString())
      .send({ 'name': newName, 'description': newDescription })

    console.log(response.body);

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body._id).toBe(postResponse.body._id.toString());
    expect(response.body.name).toBe(newName);
    expect(response.body.description).toBe(newDescription);
  });

  test('get all projects for a user', async () => {
    const postResponse = await agent
      .post('/project')
      .send({ 'name': 'My Project', 'createdBy': user.id })
      .set('Accept', 'application/json');

    const response = await agent
      .get('/projects?userId=' + user.id)
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('get all issues for a project', async () => {
    //create project
    //create an issue for that project
    //get all issues for that project

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