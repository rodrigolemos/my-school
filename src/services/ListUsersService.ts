import { getRepository } from 'typeorm'
import User from '../models/User'

class ListUsersService {

  public async execute(): Promise<User[]> {
    const userRepository = getRepository(User)
    const users = await userRepository.find()
    const foundUsers = users.map(user => {
      delete user.password
      return user
    })
    return foundUsers
  }

}

export default ListUsersService