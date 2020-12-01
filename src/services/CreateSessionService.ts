import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../utils/AppError'

import { compareHash } from '../utils/Hash'
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
      where: {
        email
      }
    })

    if (!userRegistered || !userRegistered.password)
      throw new AppError('Incorrect e-mail or password', 401)

    const validPassword = await compareHash(password, userRegistered.password)

    if (!validPassword)
      throw new AppError('Incorrect e-mail or password', 401)

    const { expiresIn, secret } = authConfig.jwt

    if (!secret)
      throw new AppError('Internal server error', 500)

    const token = sign({}, secret, {
      subject: String(userRegistered.id),
      expiresIn
    })

    return { email, token }
  }

}

export default CreateSessionService
