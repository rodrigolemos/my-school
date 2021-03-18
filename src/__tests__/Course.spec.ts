import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { Connection, getConnection } from 'typeorm';
import { getTestConnection } from '../config/typeorm';
import { sign } from 'jsonwebtoken';
import { generateHash } from '../config/hash';

import app from '../server'

let connection: Connection;

const [courseId1, courseId2] = [uuidv4(), uuidv4()];
const [userId1, userId2] = [uuidv4(), uuidv4()];
const date = new Date().toISOString();

describe('Course tests', () => {

  beforeAll(async () => {
    connection = await getTestConnection();
    
    await connection.runMigrations();

    const criptPassword = await generateHash('password')

    await connection.query(
      `INSERT INTO users VALUES('${userId1}', 'Admin', 'email@email.com', '${criptPassword}', 'admin', '${userId1}', '${date}')`
    );

    await connection.query(
      `INSERT INTO users VALUES('${userId2}', 'Student', 'student@email.com', '${criptPassword}', 'student', '${userId2}', '${date}')`
    );

    await connection.query(
      `INSERT INTO courses VALUES('${courseId1}', 'Course 1', 'Desc 1', 'N', '${userId1}', '${date}', '${date}', 10)`
    );

    await connection.query(
      `INSERT INTO courses VALUES('${courseId2}', 'Course 2', 'Desc 2', 'N', '${userId1}', '${date}', '${date}', 20)`
    );

  });

  afterAll(async () => {
    await connection.query('TRUNCATE TABLE courses CASCADE');
    await connection.query('TRUNCATE TABLE users CASCADE');  

    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should list all courses', async () => {
    const response = await request(app).get('/courses').send();

    expect(response.status).toBe(200);
  });

  it('should list a specific course', async () => {
    const response = await request(app).get(`/courses/${courseId1}`).send();

    expect(response.status).toBe(200);
  });

  it('should throw 404 if no courses were found', async () => {
    
    const response = await request(app).get(`/courses/${userId1}`).send();

    expect(response.status).toBe(404);
    
  });
  
  it('should throw 401 if non-logged user tries to create a new course', async () => {
    const response = await request(app)
    .post('/courses/create')
    .send({
      name: 'Test Course',
      description: 'A test course',
      period: 'N',
      positions: 10,
      created_by: userId1,
      tags: []
    })

    expect(response.status).toBe(401);
  });

  it('should throw 401 if non-admin user tries to create a new course', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId2),
      expiresIn: '1h'
    })

    const response = await request(app)
    .post('/courses/create')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      name: 'Test Course',
      description: 'A test course',
      period: 'N',
      positions: 10,
      created_by: userId2,
      tags: []
    })

    expect(response.status).toBe(401);
  });

  it('should allow an admin to create a new course', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    const response = await request(app)
    .post('/courses/create')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      name: 'Test Course',
      description: 'A test course',
      period: 'N',
      positions: 10,
      created_by: userId1,
      tags: []
    })

    expect(response.status).toBe(201);
  });

  it('should throw 400 if course information was not provided correctly', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    const response = await request(app)
    .post('/courses/create')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      name: '',
      description: '',
      period: 'N',
      positions: 10,
      created_by: userId1,
      tags: []
    })

    expect(response.status).toBe(400);
  });

  it('should throw 400 if an admin tries to create a new course with an already used course name', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    await request(app)
    .post('/courses/create')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      name: 'Test Course',
      description: 'A test course',
      period: 'N',
      positions: 10,
      created_by: userId1,
      tags: []
    })

    const response = await request(app)
    .post('/courses/create')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      name: 'Test Course',
      description: 'A test course',
      period: 'N',
      positions: 10,
      created_by: userId1,
      tags: []
    })

    expect(response.status).toBe(400);
    // expect(response.body.status).toBe(2);
  });

});
