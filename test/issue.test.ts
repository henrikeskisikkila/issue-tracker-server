import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import app from '../src/app';
import Issue from '../src/models/issue';
import User from '../src/models/user';
import Project from '../src/models/project';
import properties from '../src/config/properties';

mongoose.connect(properties.mongoURI);

describe('Testing REST API endpoints (Issue)', () => {
  let agent: request.SuperAgentTest;
  let user = { id: '', username: 'name', email: 'john@test.com', password: 'testing' };

  beforeAll(async () => {
    agent = request.agent(app);

    // Create a new test user
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
    await Project.deleteMany({});
    await mongoose.connection.close();
  });

  test('get all issues for a project', async () => {
    //create a project
    const projectResponse = await agent
      .post('/project')
      .send({ 'name': 'My Project', 'createdBy': user.id })
      .set('Accept', 'application/json');

    expect(projectResponse.statusCode).toBe(StatusCodes.OK);
    expect(projectResponse.body).toBeDefined();
    expect(projectResponse.body.createdBy.toString()).toBe(user.id);
    console.log(projectResponse.body);
    const projectId = projectResponse.body._id;
    console.log('projectId' + projectId);

    //create an issue for the project
    const issueResponse = await agent
      .post('/issue')
      .send({ 'title': 'My Title', 'content': 'My Content', createdBy: user.id, projectId: projectId })
      .set('Accept', 'application/json');

    expect(issueResponse.statusCode).toBe(StatusCodes.OK);
    expect(issueResponse.body.id).toBeDefined();

    const response = await agent
      .get('/issues?projectId=' + projectId)
      .set('Accept', 'application/json')

    expect(response.statusCode).toBe(StatusCodes.OK);
    console.log(response.body);
  });

  test('get an issue by using its identifier', async () => {
    const postResponse = await agent
      .post('/issue')
      .send({ 'title': 'Title', 'content': 'Content' })
      .set('Accept', 'application/json')

    expect(postResponse.statusCode).toBe(StatusCodes.OK);
    expect(postResponse.body.id).toBeDefined();

    const getResponse = await agent
      .get('/issue/' + postResponse.body.id)
      .set('Accept', 'application/json');

    expect(getResponse.statusCode).toBe(StatusCodes.OK);
    expect(getResponse.body._id).toEqual(postResponse.body.id);
  });

  test('post an new issue', async () => {
    const response = await agent
      .post('/issue')
      .send({ 'title': 'My Title', 'content': 'My Content' })
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.id).toBeDefined();
  });

  test('post an new issue with invalid data', async () => {
    const response = await agent
      .post('/issue')
      .send({})
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test('update an issue', async () => {
    const response = await agent
      .post('/issue')
      .send({ 'title': 'My Title', 'content': 'My Content' })
      .set('Accept', 'application/json');

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.id).toBeDefined();

    const newTitle = 'Updated Title';
    const newContent = 'Updated Content';

    const updateResponse = await agent
      .put('/issue/' + response.body.id)
      .send({ 'title': newTitle, 'content': newContent })

    expect(updateResponse.statusCode).toBe(StatusCodes.OK);
    expect(updateResponse.body._id).toBe(response.body.id);
    expect(updateResponse.body.title).toBe(newTitle);
    expect(updateResponse.body.content).toBe(newContent);
  });

  test('delete an issue by using its identifier', async () => {
    const postResponse = await agent
      .post('/issue')
      .send({ 'title': 'My Title', 'content': 'My Content' })
      .set('Accept', 'application/json');

    expect(postResponse.statusCode).toBe(StatusCodes.OK);
    expect(postResponse.body.id).toBeDefined();

    const deleteResponse = await agent
      .delete('/issue/' + postResponse.body.id)

    expect(deleteResponse.statusCode).toBe(StatusCodes.OK);
  });

  test('trying to delete an issue without identifier', async () => {
    const response = await agent
      .delete('/issue/')

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});