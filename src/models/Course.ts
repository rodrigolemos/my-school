import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

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
  created_by?: number

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}

export default Course
