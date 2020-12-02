import { getRepository } from 'typeorm'
import Course from '../models/Course'
import { checkPermission } from '../middlewares/ensurePermission'
import AppError from '../utils/AppError'

interface IRequest {
  name: string
  period: string
  created_by: number
}

class CreateCourseService {

  public async execute(body: IRequest): Promise<Course> {
    const { name, period, created_by } = body

    // Check permissions
    if (!await checkPermission(created_by))
      throw new AppError('Unauthorized', 401)

    const courseRepository = getRepository(Course)

    const courseRegistered = await courseRepository.findOne({
      where: {
        name,
        period
      }
    })

    if (courseRegistered)
      throw new AppError('A course with this name/period is already registered', 400)

    const course = courseRepository.create({ name, period, created_by })

    await courseRepository.save(course)

    return course
  }

}

export default CreateCourseService
