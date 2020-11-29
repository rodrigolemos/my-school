import {
  Entity,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import Course from './Course';
import Student from './Student';

@Entity('enrollments')
class Enrollment {
  @PrimaryColumn('integer')
  @ManyToMany(() => Student, student => student.id)
  @JoinColumn({ name: 'student_id' })
  student_id?: number

  @PrimaryColumn('integer')
  @ManyToMany(() => Course, course => course.id)
  @JoinColumn({ name: 'course_id' })
  course_id?: number

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Enrollment