import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { Connection, getConnection } from 'typeorm';
import { getTestConnection } from '../config/typeorm';
import { sign } from 'jsonwebtoken';
import { generateHash } from '../config/hash';

import app from '../server'

let connection: Connection;

const [userId1, userId2, userId3, userId4] = [uuidv4(), uuidv4(), uuidv4(), uuidv4()];
const [courseId1, courseId2] = [uuidv4(), uuidv4()];
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
      `INSERT INTO users VALUES('${userId4}', 'Student 2', 'student2@email.com', '${criptPassword}', 'student', '${userId4}', '${date}')`
    );

    await connection.query(
      `INSERT INTO users VALUES('${userId3}', 'Teacher', 'teacher@email.com', '${criptPassword}', 'teacher', '${userId3}', '${date}')`
    );

    await connection.query(
      `INSERT INTO courses VALUES('${courseId1}', 'Course 1', 'Desc 1', 'N', '${userId1}', '${date}', '${date}', 10)`
    );

    await connection.query(
      `INSERT INTO courses VALUES('${courseId2}', 'Course 2', 'Desc 2', 'N', '${userId1}', '${date}', '${date}', 0)`
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

  it('should not allow a user to have more than one enrollment in the same course', async () => {
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

    expect(response.status).toBe(400);
    expect(response.body.message.status).toBe(4);
  });

  it('should throw 404 if a user tries to create an enrollment in a course that does not exist', async () => {
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
      course_id: userId2,
      id: userId1
    })

    expect(response.status).toBe(404);
    expect(response.body.message.status).toBe(1);
  });

  it('should throw 404 if a user tries to create an enrollment to a student/teacher that does not exist', async () => {
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
      user_id: courseId1,
      course_id: courseId1,
      id: userId1
    })

    expect(response.status).toBe(404);
    expect(response.body.message.status).toBe(2);
  });

  it('should throw 400 if a user tries to enroll a student or teacher in a course with no open positions', async () => {
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
      course_id: courseId2,
      id: userId1
    })

    expect(response.status).toBe(400);
    expect(response.body.message.status).toBe(2);
  });

  it('should throw 400 if a user tries to enroll an admin in a course', async () => {
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
      user_id: userId1,
      course_id: courseId1,
      id: userId1
    })

    expect(response.status).toBe(400);
    expect(response.body.message.status).toBe(3);
  });
  
  it('should allow an admin to create an enrollment', async () => {
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
      user_id: userId3,
      course_id: courseId1,
      created_by: userId1,
      id: userId1,
    })

    expect(response.status).toBe(201);
  });

  it('should throw 401 if a non-admin tries to enroll a user in a course', async () => {
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
      user_id: userId4,
      course_id: courseId1,
      created_by: userId2,
      id: userId1,
    })

    expect(response.status).toBe(401);
    expect(response.body.message.status).toBe(3);
  });

});
