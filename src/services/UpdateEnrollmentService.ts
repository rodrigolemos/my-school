import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'
import Course from '../models/Course'
import User from '../models/User'
import { checkPermission } from '../middlewares/ensurePermission'
import AppError from '../errors/AppError'


interface IRequest {
  user_id: number
  course_id: number
  approved_by: number
  status: string
}

class UpdateEnrollmentService {

  public async execute(body: IRequest): Promise<Enrollment> {
    const { user_id, course_id, approved_by, status } = body

    const courseRepository = getRepository(Course)
    const userRepository = getRepository(User)
    const enrollmentRepository = getRepository(Enrollment)

    // Check if course does exist
    const course = await courseRepository.findOne({
      where: {
        id: course_id
      }
    })

    if (!course)
      throw new AppError({
        status: 1,
        message: 'Course not found'
      }, 404)

    // Check if user does exist
    // Check if user can be enrolled to a course
    const user = await userRepository.findOne({
      where: {
        id: user_id
      }
    })

    if (!user)
      throw new AppError({
        status: 2,
        message: 'User not found'
      }, 404)

    if (user.role !== 'student' && user.role !== 'teacher')
      throw new AppError({
        status: 2,
        message: 'This user role is not allowed to be enrolled to a course'
      }, 400)
    
    // Validade course positions
    if (user.role === 'student') {
      if (course.positions) {
        // If its enrollment is approved
        if (status === 'A') {
          if (course.positions === 0)
            throw new AppError({
              status: 3,
              message: 'There are no open positions to this course'
            }, 400)
          
          course.positions = course.positions - 1
        } else {
          course.positions = course.positions + 1
        }
      }
    }

    // Check enrollment is pendent
    const enrollmentFound = await enrollmentRepository.findOne({
      where: {
        user_id,
        course_id,
        status: 'P'
      }
    })

    if (!enrollmentFound)
      throw new AppError({
        status: 4,
        message: 'Pendent enrollment not found'
      }, 400)

    // Check permissions
    if (!await checkPermission(approved_by))
      throw new AppError({
        status: 3,
        message: 'Unauthorized'
      }, 401)

    enrollmentFound.updated_at = new Date()

    enrollmentFound.approved_by = approved_by

    enrollmentFound.status = status

    // Update course positions
    await courseRepository.save(course)

    await enrollmentRepository.update({ user_id, course_id }, enrollmentFound)

    return enrollmentFound
  }

}

export default UpdateEnrollmentService
