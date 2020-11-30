import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
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

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}

export default User
