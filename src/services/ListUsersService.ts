import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../errors/AppError'

interface IRequest {
  id?: number
}
class ListUsersService {

  public async execute(params: IRequest): Promise<User[]> {
    const userRepository = getRepository(User)

    const where: IRequest = {}

    if (params.id)
      where.id = params.id

    const users = await userRepository.find({ where, order: { name: 'ASC' } })

    if (!users.length)
      throw new AppError('Users not found for this filter', 404)

    return users
  }

}

export default ListUsersService