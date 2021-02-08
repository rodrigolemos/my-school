import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'
import AppError from '../errors/AppError'

interface IRequest {
  user_id: number
  course_id: number
}

class DeleteEnrollmentService {

  public async execute(body: IRequest): Promise<boolean> {
    const { user_id, course_id } = body

    const enrollmentRepository = getRepository(Enrollment)

    const enrollmentRegistered = await enrollmentRepository.findOne({
      where: {
        user_id,
        course_id
      }
    })

    if (!enrollmentRegistered)
      throw new AppError({
        status: 1,
        message: 'Enrollment not found'
      }, 404)

    await enrollmentRepository.delete({
      user_id,
      course_id
    })

    return true
  }

}

export default DeleteEnrollmentService
