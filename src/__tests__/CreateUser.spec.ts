import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { Connection, getConnection } from 'typeorm';
import { getTestConnection } from '../config/typeorm';
import { generateHash } from '../config/hash'
import { sign } from 'jsonwebtoken';

import app from '../server'

let connection: Connection;
const [userId1, userId2] = [uuidv4(), uuidv4()];
const date = new Date().toISOString();

describe('CreateUserService', () => {

  beforeAll(async () => {
    connection = await getTestConnection();

    const criptPassword = await generateHash('password')

    await connection.query(
      `INSERT INTO users VALUES('${userId1}', 'Admin', 'admin@email.com', '${criptPassword}', 'admin', '${userId1}', '${date}')`
    );

    await connection.query(
      `INSERT INTO users VALUES('${userId2}', 'Fake User', 'fake@email.com', '${criptPassword}', 'student', '${userId1}', '${date}')`
    );

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
      email: 'student@email.com',
      password,
      role: 'student'
    });

    expect(response.status).toBe(201);
  });

  it('should create a teacher', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    const password = await generateHash('password')
    const response = await request(app)
    .post('/users/create')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      name: 'Teacher',
      email: 'teacher@email.com',
      password,
      role: 'teacher'
    });

    expect(response.status).toBe(201);
  });

  it('should throw 400 if the user tries to create an account with a used e-mail', async () => {
    const password = await generateHash('password')
    const response = await request(app).post('/users/create').send({
      name: 'Student',
      email: 'student@email.com',
      password,
      role: 'student'
    });

    expect(response.status).toBe(400);
  });

  it('should throw 401 if a non-logged user tries to create an admin', async () => {
    const password = await generateHash('password')
    const response = await request(app)
    .post('/users/create')
    .send({
      name: 'Another Teacher',
      email: 'another_teacher@email.com',
      password,
      role: 'admin'
    });

    expect(response.status).toBe(401);
    expect(response.body.message.status).toBe(6);
  });

  it('should throw 401 if a non-admin user tries to create an admin', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    const password = await generateHash('password')
    const response = await request(app)
    .post('/users/create')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      name: 'New Admin',
      email: 'new_admin@email.com',
      password,
      role: 'admin',
      created_by: userId2
    });

    expect(response.status).toBe(401);
    expect(response.body.message.status).toBe(5);
  });

  it('should allow admins to create an admin', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    const password = await generateHash('password')
    const response = await request(app)
    .post('/users/create')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      name: 'New Admin',
      email: 'new_admin@email.com',
      password,
      role: 'admin',
      created_by: userId1
    });

    expect(response.status).toBe(201);
  });

});
