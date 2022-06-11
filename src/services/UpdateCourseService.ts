import { getRepository } from 'typeorm'
import Course from '../models/Course'
import AppError from '../errors/AppError'

interface IRequest {
  id: string
  name?: string
  description?: string
  tags?: string[]
  resources?: string[]
  icon: string
  audience: string
  knowledge: string
}

class UpdateCourseService {

  public async execute(body: IRequest): Promise<Course> {
    const {
      id,
      name,
      description,
      tags,
      resources,
      audience,
      knowledge,
      icon
    } = body
    const courseRepository = getRepository(Course)

    const courseRegistered = await courseRepository.findOne({
      where: {
        id
      }
    })

    if (!courseRegistered)
      throw new AppError({
        status: 1,
        message: 'Course not found'
      }, 404)

    if (name)
      courseRegistered.name = name

    if (description)
      courseRegistered.description = description

    if (tags)
      courseRegistered.tags = tags
    
    if (resources)
      courseRegistered.resources = resources
    
    if (audience)
      courseRegistered.audience = audience
    
    if (knowledge)
      courseRegistered.knowledge = knowledge
    
    if (icon)
      courseRegistered.icon = icon

    courseRegistered.updated_at = new Date()

    await courseRepository.update(id, courseRegistered)

    return courseRegistered
  }

}

export default UpdateCourseService
