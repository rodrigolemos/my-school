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

describe('DeleteCourseService', () => {

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
      `INSERT INTO courses VALUES('${courseId2}', 'Course 2', 'Desc 2', 'N', '${userId1}', '${date}', '${date}', 10)`
    );

    await connection.query(
      `INSERT INTO enrollments VALUES('${userId2}', '${courseId1}', '${userId2}', '${date}', '${date}', 'A', '${userId1}')`
    );

  });

  afterAll(async () => {
    await connection.query('TRUNCATE TABLE courses CASCADE');
    await connection.query('TRUNCATE TABLE users CASCADE');
    await connection.query('TRUNCATE TABLE enrollments CASCADE');

    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('should throw 401 if non-admin user tries to delete a course', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId2),
      expiresIn: '1h'
    })

    const response = await request(app)
    .delete(`/courses/${courseId2}`)
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({})

    expect(response.status).toBe(401);
  });

  it('should allow an admin to delete a course', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    const response = await request(app)
    .delete(`/courses/${courseId2}`)
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({})

    expect(response.status).toBe(204);
  });

  it('should throw 404 if an admin tries to delete a course that does not exist', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    const response = await request(app)
    .delete(`/courses/${courseId2}`)
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({})

    expect(response.status).toBe(404);
    expect(response.body.message.status).toBe(1);
  });

  it('should not allow an admin to delete a course if there are enrollments', async () => {
    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: String(userId1),
      expiresIn: '1h'
    })

    const response = await request(app)
    .delete(`/courses/${courseId1}`)
    .set({
      'Authorization': `Bearer ${token}`
    })
    .send({})

    expect(response.status).toBe(400);
    expect(response.body.message.status).toBe(2);
  });

});
