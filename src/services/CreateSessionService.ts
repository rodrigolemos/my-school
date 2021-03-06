import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../errors/AppError'

import { compareHash } from '../config/hash'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'

interface IRequest {
  email: string
  password: string
}

class CreateSessionService {

  public async execute(body: IRequest): Promise<{}> {
    const { email, password } = body
    const userRepository = getRepository(User)

    const userRegistered = await userRepository.findOne({
      select: ['id', 'name', 'password'],
      where: {
        email
      }
    })

    if (!userRegistered || !userRegistered.password)
      throw new AppError({
        status: 1,
        message: 'Incorrect e-mail or password'
      }, 401)

    const validPassword = await compareHash(password, userRegistered.password)

    if (!validPassword)
      throw new AppError({
        status: 1,
        message: 'Incorrect e-mail or password'
      }, 401)

    const { expiresIn, secret } = authConfig.jwt

    if (!secret)
      throw new AppError({
        status: 1,
        message: 'Internal server error'
      }, 500)

    const token = sign({}, secret, {
      subject: String(userRegistered.id),
      expiresIn
    })

    const { id, name, } = userRegistered

    return { id, name, token }
  }

}

export default CreateSessionService
