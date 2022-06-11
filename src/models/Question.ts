import {
  Entity,
  Column,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Course from './Course'
import User from './User'

@Entity('questions')
class Question {
  @Column('uuid')
  id?: string

  @PrimaryColumn('uuid')
  @ManyToOne(() => Course, course => course.id)
  @JoinColumn({ name: 'course_id' })
  course_id?: string

  @PrimaryColumn('integer')
  order?: number

  @Column('varchar')
  question?: object

  @Column('json')
  alternatives?: object

  @Column('json')
  answers?: object

  @Column('uuid')
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'created_by' })
  created_by?: number

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Question
