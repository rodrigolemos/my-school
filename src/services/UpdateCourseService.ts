import { getRepository } from 'typeorm'
import Course from '../models/Course'
import AppError from '../errors/AppError'

interface IRequest {
  id: string
  name?: string
  description?: string
  tags?: object
  positions?: number
}

class UpdateCourseService {

  public async execute(body: IRequest): Promise<Course> {
    const { id, name, description, positions, tags } = body
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

    if (positions)
      courseRegistered.positions = positions

    if (tags)
      courseRegistered.tags = tags

    courseRegistered.updated_at = new Date()

    await courseRepository.update(id, courseRegistered)

    return courseRegistered
  }

}

export default UpdateCourseService
