import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id?: number

  @Column('varchar')
  name?: string

  @Column('date')
  birth_date?: Date

  @Column('varchar')
  email?: string

  @Column('varchar')
  password?: string

  @Column('varchar')
  role?: string

  @Column('uuid')
  created_by?: number

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}

export default User
