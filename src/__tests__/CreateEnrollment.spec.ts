import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { Connection, getConnection } from 'typeorm';
import { getTestConnection } from '../config/typeorm';
import { sign } from 'jsonwebtoken';
import { generateHash } from '../config/hash';

import app from '../server'

let connection: Connection;

const [userId1, userId2, courseId1] = [uuidv4(), uuidv4(), uuidv4()];
const date = new Date().toISOString();

describe('CreateCourseService', () => {

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

  });

  afterAll(async () => {
    await connection.query('TRUNCATE TABLE courses CASCADE');
    await connection.query('TRUNCATE TABLE users CASCADE');  

    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should allow a user to create its own enrollment', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    const response = await request(app)
    .post('/enrollments/create')
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({
      user_id: userId2,
      course_id: courseId1,
      id: userId1
    })

    expect(response.status).toBe(201);
  });

});
