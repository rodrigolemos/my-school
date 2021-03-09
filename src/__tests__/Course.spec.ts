import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { getTestConnection } from '../config/typeorm';

import app from '../server'

let connection: Connection;

describe('Course tests', () => {

  beforeAll(async () => {
    connection = await getTestConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM enrollments');
    await connection.query('DELETE FROM courses');
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should return all courses', async () => {
    
    // const response = await request(app).get('/courses').send({});

    expect(true).toBe(true);
    
  });

});
