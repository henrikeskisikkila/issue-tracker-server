import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import app from '../src/app';
import User from '../src/models/user';
import Project from '../src/models/project';
import properties from '../src/config/properties';

mongoose.connect(properties.mongoURI);

describe('Testing REST API endpoints (Issue)', () => {
  let agent: request.SuperAgentTest;
  agent = request.agent(app);
  let user, projectId, issue;

  beforeAll(async () => {
    user = {
      id: '',
      username: 'Issue User',
      email: 'issue@test.com',
      password: 'testing'
    };

    // Create a test user
    await agent
      .post('/signup')
      .send(user);

    // Authenticate the test user
    const response = await agent
      .post('/authenticate')
      .send({ email: user.email, password: user.password });

    user.id = response.body.id;

    //create a new project
    const projectResponse = await agent
      .post('/project')
      .send({ 'name': 'My Project', 'createdBy': user.id })
    projectId = projectResponse.body._id;

    issue = {
      'title': 'My Title',
      'content': 'My Content',
      createdBy: user.id,
      projectId: projectId
    }
  });

  afterAll(async () => {
    await Project.deleteOne({ _id: projectId });
    await User.deleteOne({ email: user.email });
    await mongoose.connection.close();
  });

  test('get all issues for a project', async () => {
    const issueResponse = await agent.post('/issue').send(issue)
    expect(issueResponse.status).toBe(StatusCodes.OK);
    expect(issueResponse.body.id).toBeDefined();
    const issueId = issueResponse.body.id;

    const response = await agent.get(`/issues?projectId=${projectId}`)
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.length).toBeGreaterThan(0);

    const result = response.body.filter(issue => issue._id == issueId);
    expect(result.length).toBe(1);
    expect(result[0]._id).toBe(issueId);
  });

  test('get an issue by using its identifier', async () => {
    const postResponse = await agent.post('/issue').send(issue)
    expect(postResponse.statusCode).toBe(StatusCodes.OK);
    expect(postResponse.body.id).toBeDefined();

    const getResponse = await agent
      .get('/issue/' + postResponse.body.id)
    expect(getResponse.statusCode).toBe(StatusCodes.OK);
    expect(getResponse.body._id).toEqual(postResponse.body.id);
  });

  test('post an new issue with valid data', async () => {
    const response = await agent.post('/issue').send(issue)
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.id).toBeDefined();
  });

  test('post an new issue with invalid data', async () => {
    const response = await agent.post('/issue').send({})
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test('update an issue', async () => {
    const response = await agent.post('/issue').send(issue)
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
    const postResponse = await agent.post('/issue').send(issue)
    expect(postResponse.statusCode).toBe(StatusCodes.OK);
    expect(postResponse.body.id).toBeDefined();

    const deleteResponse = await agent
      .delete('/issue/' + postResponse.body.id)
    expect(deleteResponse.statusCode).toBe(StatusCodes.OK);
  });

  test('trying to delete an issue without identifier', async () => {
    const response = await agent.delete('/issue/')
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});