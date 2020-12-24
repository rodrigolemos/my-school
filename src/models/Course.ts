import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import User from './User'
@Entity('courses')
class Course {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column('varchar')
  name?: string

  @Column('varchar')
  description?: string

  @Column('varchar')
  period?: string

  @Column('integer')
  positions?: number

  @Column('integer')
  @OneToOne(() => User, user => user.id, { eager: true })
  @JoinColumn({ name: 'created_by' })
  created_by?: number

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}

export default Course
