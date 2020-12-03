import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'
import User from '../models/User'
import AppError from '../utils/AppError'

class DeleteUserService {

  public async execute(id: string): Promise<boolean> {
    const userRepository = getRepository(User)
    const enrollmentsRepository = getRepository(Enrollment)

    const userRegistered = await userRepository.findOne({
      where: {
        id
      }
    })

    if (!userRegistered)
      throw new AppError('User not found', 404)

    const enrollments = await enrollmentsRepository.findOne({
      where: {
        user_id: id
      }
    })

    if (enrollments)
      throw new AppError('This user is enrolled to a course. Before delete it, delete the enrollment.', 400)

    await userRepository.delete(id)

    return true
  }

}

export default DeleteUserService
