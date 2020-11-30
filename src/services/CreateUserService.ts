import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../utils/AppError'
import { generateHash } from '../utils/Hash'

interface IRequest {
  name: string
  birth_date: Date
  email: string
  password: string
  role: string
}

class CreateUserService {

  public async execute(body: IRequest): Promise<User> {
    const { name, birth_date, email, password, role } = body
    const userRepository = getRepository(User)

    const userRegistered = await userRepository.findOne({
      where: {
        email
      }
    })

    if (userRegistered)
      throw new AppError('Email address already used', 400)

    const criptPassword = await generateHash(password)

    const user = userRepository.create({
      name,
      birth_date,
      email,
      role,
      password: criptPassword
    })

    await userRepository.save(user)

    delete user.password

    return user
  }

}

export default CreateUserService
