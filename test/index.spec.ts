import request from 'supertest';
import { server } from '../src/server';
import { User } from '../src/user/user.interface';

let id: string | undefined;

describe('Scenario #1', () => {
  test('When send get all users request on empty database', async () => {
    const answer = await request(server).get('/api/users');
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual([]);
  });
  test('When send create user request', async () => {
    const user = {
      username: 'Irina',
      age: 30,
      hobbies: ['cycling', 'knitting'],
    };
    const answer = await request(server).post('/api/users').send(user);
    expect(answer.statusCode).toBe(201);
    expect(answer.body.username).toEqual(user.username);
    expect(answer.body.age).toEqual(user.age);
    expect(answer.body.hobbies).toEqual(user.hobbies);
  });
  test('When send get the created user by id request', async () => {
    const user: User = (await request(server).get('/api/users')).body[0];
    id = user.id;
    const answer = await request(server).get(`/api/users/${id}`);
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual(user);
  });
  test('When send update the created by id user request', async () => {
    const answer = await request(server)
      .put(`/api/users/${id}`)
      .send({
        username: 'Marina',
        age: 30,
        hobbies: ['cycling', 'knitting'],
      });
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual({
      id: id,
      username: 'Marina',
      age: 30,
      hobbies: ['cycling', 'knitting'],
    });
  });
  test('When send delete the created user by id request', async () => {
    const answer = await request(server).delete(`/api/users/${id}`);
    expect(answer.statusCode).toBe(204);
  });
  it('When send get the deleted user by id request on empty database', async () => {
    const answer = await request(server).get(`/api/users/${id}`);
    expect(answer.statusCode).toBe(404);
    expect(answer.body).toEqual({ message: 'User not found', statusCode: 404 });
  });
});

describe('Scenario #2', () => {
  test('When send get request to invalid url', async () => {
    const answer = await request(server).get('/api/persons');
    expect(answer.statusCode).toBe(404);
    expect(answer.body).toEqual({ message: 'Resource you requested does not exist', statusCode: 404 });
  });
  test('When send create user request', async () => {
    const user = {
      username: 'Ihar',
      age: 40,
      hobbies: ['swimming'],
    };
    const answer = await request(server).post('/api/users').send(user);
    expect(answer.statusCode).toBe(201);
    expect(answer.body.username).toEqual(user.username);
    expect(answer.body.age).toEqual(user.age);
    expect(answer.body.hobbies).toEqual(user.hobbies);
  });
  let id: string | undefined;
  test('When send get the user by non-existent id request', async () => {
    id = '071d18a0-86ff-40ec-9089-154decf17d26';
    const answer = await request(server).get(`/api/users/${id}`);
    expect(answer.statusCode).toBe(404);
    expect(answer.body).toEqual({ message: 'User not found', statusCode: 404 });
  });
  test('When send get the user by invalid id request', async () => {
    id = typeof id === 'string' ? id.replace(id[0], 't') : '071d18a0-86ff-40ec-9089-154decf17d2y';
    const answer = await request(server).get(`/api/users/${id}`);
    expect(answer.statusCode).toBe(400);
    expect(answer.body).toEqual({ message: 'User id is invalid (not uuid)', statusCode: 400 });
  });
  test('When send delete the created user by invalid id request', async () => {
    const answer = await request(server).delete(`/api/users/${id}`);
    expect(answer.statusCode).toBe(400);
    expect(answer.body).toEqual({ message: 'User id is invalid (not uuid)', statusCode: 400 });
  });
  test('When send delete the created user by id request', async () => {
    const user: User = (await request(server).get('/api/users')).body[0];
    id = user.id;
    const answer = await request(server).delete(`/api/users/${id}`);
    expect(answer.statusCode).toBe(204);
  });
});

describe('Scenario #3', () => {
  test('When send create user without required fields request', async () => {
    const answer = await request(server)
      .post('/api/users')
      .send({
        username: 'Andy',
        hobbies: ['birdwatching'],
      });
    expect(answer.statusCode).toBe(400);
    expect(answer.body).toEqual({ message: 'Required information was not send ', statusCode: 400 });
  });
  test('When send create user request', async () => {
    const user = {
      username: 'Andy',
      age: 46,
      hobbies: ['birdwatching'],
    };
    const answer = await request(server).post('/api/users').send(user);
    expect(answer.statusCode).toBe(201);
    expect(answer.body.username).toEqual(user.username);
    expect(answer.body.age).toEqual(user.age);
    expect(answer.body.hobbies).toEqual(user.hobbies);
  });
  let id: string | undefined;
  test('When send update the user by non-existent id request', async () => {
    id = '071d18a0-86ff-40ec-9089-154decf17d26';
    const answer = await request(server)
      .put(`/api/users/${id}`)
      .send({
        username: 'Andy',
        age: 45,
        hobbies: ['birdwatching'],
      });
    expect(answer.statusCode).toBe(404);
    expect(answer.body).toEqual({ message: 'User not found', statusCode: 404 });
  });
  test('When send update the user by invalid id request', async () => {
    id = typeof id === 'string' ? id.replace(id[0], 't') : '071d18a0-86ff-40ec-9089-154decf17d2y';
    const answer = await request(server)
      .put(`/api/users/${id}`)
      .send({
        username: 'Andy',
        age: 45,
        hobbies: ['birdwatching'],
      });
    expect(answer.statusCode).toBe(400);
    expect(answer.body).toEqual({ message: 'User id is invalid (not uuid)', statusCode: 400 });
  });
  test('When send update the created by id user request', async () => {
    const user: User = (await request(server).get('/api/users')).body[0];
    id = user.id;
    const answer = await request(server)
      .put(`/api/users/${id}`)
      .send({
        username: 'Andy',
        age: 45,
        hobbies: ['birdwatching'],
      });
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual({
      id: id,
      username: 'Andy',
      age: 45,
      hobbies: ['birdwatching'],
    });
  });
  test('When send get all users request on non-empty database', async () => {
    const answer = await request(server).get('/api/users');
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual([
      {
        id: id,
        username: 'Andy',
        age: 45,
        hobbies: ['birdwatching'],
      },
    ]);
  });
});

afterAll(async () => {
  server.close();
});
