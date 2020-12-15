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

  @Column('varchar')
  email?: string

  @Column('varchar', { select: false })
  password?: string

  @Column('varchar')
  role?: string

  @Column('varchar')
  contact?: string
  
  @Column('varchar')
  bio?: string

  @Column('uuid')
  created_by?: number

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}

export default User
