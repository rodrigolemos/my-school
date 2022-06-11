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
  id?: string

  @Column('varchar')
  name?: string

  @Column('varchar')
  description?: string

  @Column('json')
  tags?: object

  @Column('varchar')
  icon?: string

  @Column('varchar')
  visibility?: 'public' | 'private'

  @Column('json')
  resources?: object

  @Column('varchar')
  audience?: string

  @Column('varchar')
  knowledge?: string

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
