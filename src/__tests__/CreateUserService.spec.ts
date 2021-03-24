import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { getTestConnection } from '../config/typeorm';
import { generateHash } from '../config/hash'

import app from '../server'

let connection: Connection;

const date = new Date().toISOString();

describe('CreateUserService', () => {

  beforeAll(async () => {
    connection = await getTestConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.query('TRUNCATE TABLE users CASCADE');  

    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should create a student', async () => {
    const password = await generateHash('password')
    const response = await request(app).post('/users/create').send({
      name: 'Student',
      email: 'email@email.com',
      password,
      role: 'student'
    });

    expect(response.status).toBe(201);
  });

});
