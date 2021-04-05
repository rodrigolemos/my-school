import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { Connection, getConnection } from 'typeorm';
import { getTestConnection } from '../config/typeorm';
import { generateHash } from '../config/hash'
import { sign } from 'jsonwebtoken';

import app from '../server';

let connection: Connection;
const [userId1, userId2] = [uuidv4(), uuidv4()];
const date = new Date().toISOString();

describe('UpdateUserService', () => {

  beforeAll(async () => {
    connection = await getTestConnection();

    const criptPassword = await generateHash('password')

    await connection.query(
      `INSERT INTO users VALUES('${userId1}', 'Admin', 'admin@email.com', '${criptPassword}', 'admin', '${userId1}', '${date}')`
    );

    await connection.query(
      `INSERT INTO users VALUES('${userId2}', 'Admin2', 'admin2@email.com', '${criptPassword}', 'admin', '${userId1}', '${date}')`
    );

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.query('TRUNCATE TABLE users CASCADE');
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should throw 401 if a user tries to update another user\'s information', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    });

    const response = await request(app)
    .put('/users/')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      id: userId2,
      name: 'name',
      email: 'email@email.com',
      password: 'password',
      contact: 'contact',
      bio: 'bio'
    });

    expect(response.status).toBe(401);
    expect(response.body.message.status).toBe(2);
  });

});
