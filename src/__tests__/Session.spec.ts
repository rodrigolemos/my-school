import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { Connection, getConnection } from 'typeorm';
import { getTestConnection } from '../config/typeorm';
import { generateHash } from '../config/hash'

import app from '../server'

let connection: Connection;

const userId1 = uuidv4();
const date = new Date().toISOString();

describe('Session tests', () => {

  beforeAll(async () => {
    connection = await getTestConnection();
    
    await connection.runMigrations();

    const criptPassword = await generateHash('password')

    await connection.query(
      `INSERT INTO users VALUES('${userId1}', 'Admin', 'email@email.com', '${criptPassword}', 'admin', '${userId1}', '${date}')`
    );

  });

  afterAll(async () => {
    await connection.query('TRUNCATE TABLE users CASCADE');  

    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should create a session', async () => {
    const response = await request(app).post('/sessions/create').send({
      email: 'email@email.com',
      password: 'password'
    });

    expect(response.status).toBe(201);
  });

});
