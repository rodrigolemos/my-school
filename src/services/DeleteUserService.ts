import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'
import User from '../models/User'
import Course from '../models/Course'
import AppError from '../errors/AppError'

class DeleteUserService {

  public async execute(id: string): Promise<boolean> {
    const userRepository = getRepository(User)
    const enrollmentsRepository = getRepository(Enrollment)
    const courseRepository = getRepository(Course)

    const userRegistered = await userRepository.findOne({
      where: {
        id
      }
    })

    if (!userRegistered)
      throw new AppError({
        status: 1,
        message: 'User not found'
      }, 404)

    const enrollments = await enrollmentsRepository.findOne({
      where: {
        user_id: id
      }
    })

    if (enrollments)
      throw new AppError({
        status: 2,
        message: 'This user is enrolled to a course. Before delete it, delete the enrollment.'
      }, 400)
    
    const courseRegistered = await courseRepository.findOne({
      where: {
        created_by: id
      }
    })
  
    if (courseRegistered) {
      throw new AppError({
        status: 3,
        message: 'This user has created a course. Before delete it, delete the course.'
      }, 400)
    }

    await userRepository.delete(id)

    return true
  }

}

export default DeleteUserService
