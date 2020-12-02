import {
  Entity,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Course from './Course';
import User from './User';

@Entity('enrollments')
class Enrollment {
  @PrimaryColumn('integer')
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id?: number

  @PrimaryColumn('integer')
  @ManyToOne(() => Course, course => course.id, { eager: true })
  @JoinColumn({ name: 'course_id' })
  course_id?: number

  @PrimaryColumn('integer')
  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  created_by?: number

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Enrollment
