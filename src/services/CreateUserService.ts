import { getRepository } from 'typeorm'
import User from '../models/User'
import { checkPermission } from '../middlewares/ensurePermission'
import AppError from '../errors/AppError'
import { generateHash } from '../config/hash'

interface IRequest {
  name: string
  email: string
  password: string
  role: string
  created_by?: number
}

class CreateUserService {

  public async execute(body: IRequest): Promise<User> {
    const { name, email, password, role, created_by } = body
    const userRepository = getRepository(User)

    const userRegistered = await userRepository.findOne({
      where: {
        email
      }
    })

    if (userRegistered)
      throw new AppError('Email address already used', 400)

    const criptPassword = await generateHash(password)

    // If the user signs up, the field created_by
    // is recorded with the default value = 0
    let userBody: IRequest = {
      name,
      email,
      role,
      password: criptPassword
    }

    // Check permissions
    if (created_by) {
      if (!await checkPermission(created_by))
        throw new AppError('Unauthorized', 401)

      userBody.created_by = created_by
    }

    // An admin can only be created by another admin
    if (role === 'admin' && !created_by)
      throw new AppError('Unauthorized', 401)

    const user = userRepository.create(userBody)

    await userRepository.save(user)

    delete user.password
    delete user.created_by

    return user
  }

}

export default CreateUserService
