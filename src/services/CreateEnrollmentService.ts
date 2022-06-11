import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'
import Course from '../models/Course'
import User from '../models/User'
import { checkPermission } from '../middlewares/ensurePermission'
import AppError from '../errors/AppError'


interface IRequest {
  user_id: number
  course_id: number
  created_by?: number
}

class CreateEnrollmentService {

  public async execute(body: IRequest): Promise<Enrollment> {
    const { user_id, course_id, created_by } = body

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
        status: 3,
        message: 'This user role is not allowed to be enrolled to a course'
      }, 400)

    // Check if user is enrolled to this course
    const enrollmentFound = await enrollmentRepository.findOne({
      where: {
        user_id,
        course_id
      }
    })

    if (enrollmentFound)
      throw new AppError({
        status: 4,
        message: 'User already enrolled to this course'
      }, 400)

    // If the user signs up, the field created_by
    // is recorded with the default value = 0
    let enrollmentBody: IRequest = {
      user_id,
      course_id
    }

    // Check permissions
    if (created_by) {
      if (!await checkPermission(created_by))
        throw new AppError({
          status: 3,
          message: 'Unauthorized'
        }, 401)

      enrollmentBody.created_by = created_by
    } else {
      // created by itselft
      enrollmentBody.created_by = user_id
    }

    const enrollment = enrollmentRepository.create(enrollmentBody)

    await enrollmentRepository.save(enrollment)

    return enrollment
  }

}

export default CreateEnrollmentService
