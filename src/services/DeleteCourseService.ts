import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'
import Course from '../models/Course'
import AppError from '../errors/AppError'

class DeleteCourseService {

  public async execute(id: string): Promise<boolean> {
    const courseRepository = getRepository(Course)
    const enrollmentsRepository = getRepository(Enrollment)

    const courseRegistered = await courseRepository.findOne({
      where: {
        id
      }
    })

    console.log(id)

    if (!courseRegistered)
      throw new AppError('Course not found', 404)

    const enrollments = await enrollmentsRepository.findOne({
      where: {
        course_id: id
      }
    })

    if (enrollments)
      throw new AppError('There are enrollments in this course. Before delete it, delete the enrollments.', 400)

    await courseRepository.delete(id)

    return true
  }

}

export default DeleteCourseService
