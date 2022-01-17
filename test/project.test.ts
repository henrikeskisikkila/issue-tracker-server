import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import app from '../src/app';
import { User } from '../src/models/user';
import properties from '../src/config/properties';

describe('Testing REST API endpoints (Project)', () => {
  mongoose.connect(properties.mongoURI);
  const agent = request.agent(app);

  const user = {
    id: '',
    username: 'name',
    email: 'project@test.com',
    password: 'testing'
  };

  beforeAll(async () => {
    await agent.post('/signup').send(user);

    // Authenticate the test user
    const response = await agent
      .post('/authenticate')
      .send({ email: user.email, password: user.password });

    user.id = response.body.id;
  });

  afterAll(async () => {
    await User.deleteOne({ email: user.email });
    await mongoose.connection.close();
  });

  test('create a new project owned by a current test user', async () => {
    const response = await agent
      .post('/project')
      .send({ 'name': 'My Project', 'createdBy': user.id })

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body).toBeDefined();
    expect(response.body.createdBy.toString()).toBe(user.id);
  });

  test('update a project', async () => {
    const postResponse = await agent
      .post('/project')
      .send({ 'name': 'My Project', 'createdBy': user.id })

    expect(postResponse.body.createdBy.toString()).toBe(user.id);
    const projectId = postResponse.body._id.toString();

    const newName = 'Updated Name';
    const newDescription = 'Updated Description';
    const project = { 'name': newName, 'description': newDescription };
    const response = await agent.put(`/project/${projectId}`).send(project)

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body._id).toBe(postResponse.body._id.toString());
    expect(response.body.name).toBe(newName);
    expect(response.body.description).toBe(newDescription);
  });

  test('get all projects for a user', async () => {
    const response = await agent.get(`/projects?userId=${user.id}`)
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.length).toBeGreaterThan(0);
  });
});