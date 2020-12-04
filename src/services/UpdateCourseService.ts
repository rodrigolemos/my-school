import { getRepository } from 'typeorm'
import Course from '../models/Course'
import AppError from '../errors/AppError'
import { generateHash } from '../config/hash'

interface IRequest {
  id: string
  name?: string
  description?: string
}

class UpdateCourseService {

  public async execute(body: IRequest): Promise<Course> {
    const { id, name, description } = body
    const courseRepository = getRepository(Course)

    const courseRegistered = await courseRepository.findOne({
      where: {
        id
      }
    })

    if (!courseRegistered)
      throw new AppError('Course not found', 404)

    if (name)
      courseRegistered.name = name

    if (description)
      courseRegistered.description = description

    courseRegistered.updated_at = new Date()

    await courseRepository.update(id, courseRegistered)

    return courseRegistered
  }

}

export default UpdateCourseService
