import { getRepository } from 'typeorm'
import Course from '../models/Course'
import { checkPermission } from '../middlewares/ensurePermission'
import AppError from '../errors/AppError'

interface IRequest {
  name: string
  description: string
  tags?: string[]
  resources?: string[]
  icon: string
  audience: string
  knowledge: string
  created_by: number
}

class CreateCourseService {

  public async execute(body: IRequest): Promise<Course> {
    const {
      name,
      description,
      created_by,
      tags,
      resources,
      audience,
      knowledge,
      icon
    } = body

    // Check permissions
    if (!await checkPermission(created_by))
      throw new AppError({
        status: 5,
        message: 'Unauthorized'
      }, 401)

    const courseRepository = getRepository(Course)

    const courseRegistered = await courseRepository.findOne({
      where: {
        name,
      }
    })

    if (courseRegistered)
      throw new AppError({
        status: 2,
        message: 'A course with this name/period is already registered'
      }, 400)

    const course = courseRepository.create({
      name,
      description,
      created_by,
      tags,
      resources,
      audience,
      knowledge,
      icon
    })

    await courseRepository.save(course)

    return course
  }

}

export default CreateCourseService
