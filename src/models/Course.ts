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
  period?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}

export default Course
