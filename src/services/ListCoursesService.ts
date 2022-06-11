import { getRepository } from 'typeorm'
import { Request } from 'express'
import Course from '../models/Course'
import AppError from '../errors/AppError'

class ListCoursesService {

  public async execute(request: Request): Promise<Course[]> {
    const { params, query } = request
    const courseRepository = getRepository(Course)

    const where: Partial<Course> = {}

    if (params.id)
      where.id = params.id
    
    if (query.visibility)
      where.visibility = query.visibility as 'public' | 'private'

    const courses = await courseRepository.find({ where, order: { name: 'ASC' } })

    if (!courses.length)
      throw new AppError({
        status: 1,
        message: 'Courses not found for this filter'
      }, 404)

    return courses
  }

}

export default ListCoursesService