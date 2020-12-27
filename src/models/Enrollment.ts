import {
  Entity,
  Column,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Course from './Course'
import User from './User'

@Entity('enrollments')
class Enrollment {
  @PrimaryColumn('uuid')
  @ManyToOne(() => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user_id?: number

  @PrimaryColumn('uuid')
  @ManyToOne(() => Course, course => course.id, { eager: true })
  @JoinColumn({ name: 'course_id' })
  course_id?: number

  @Column('varchar')
  status?: string

  @Column('uuid')
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  created_by?: number
  
  @Column('integer')
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  approved_by?: number

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Enrollment
