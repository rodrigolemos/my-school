import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../errors/AppError'
import { generateHash } from '../config/hash'

interface IRequest {
  id: string
  name?: string
  email?: string
  password?: string
}

class UpdateUserService {

  public async execute(body: IRequest): Promise<User> {
    const { id, name, email, password } = body
    const userRepository = getRepository(User)

    const userRegistered = await userRepository.findOne({
      where: {
        id
      }
    })

    if (!userRegistered)
      throw new AppError('User not found', 404)

    if (name)
      userRegistered.name = name

    if (email)
      userRegistered.email = email

    if (password)
      userRegistered.password = await generateHash(password)

    userRegistered.updated_at = new Date()

    await userRepository.update(id, userRegistered)

    delete userRegistered.password

    return userRegistered
  }

}

export default UpdateUserService
