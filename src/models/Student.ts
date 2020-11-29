import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column('varchar')
  name?: string

  @Column('varchar')
  document?: string

  @Column('date')
  birth_date?: Date

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}

export default Student
