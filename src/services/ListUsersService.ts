import { getRepository } from 'typeorm'
import User from '../models/User'

class ListUsersService {

  public async execute(): Promise<User[]> {
    const userRepository = getRepository(User)
    const users = await userRepository.find()
    return users
  }

}

export default ListUsersService