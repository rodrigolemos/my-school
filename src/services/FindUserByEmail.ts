import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import User from '../models/User'

class FindUserByEmail {

  public async execute(email: string): Promise<User> {
    const userRepository = getRepository(User)

    const userRegistered = await userRepository.findOne({
      where: {
        email
      }
    })

    if (!userRegistered)
      throw new AppError('User not found', 404)

    return userRegistered
  }

}

export default FindUserByEmail
