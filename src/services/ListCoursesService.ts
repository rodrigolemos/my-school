import { getRepository } from 'typeorm'
import Course from '../models/Course'
import AppError from '../errors/AppError'

interface IRequest {
  id?: number
}

class ListCoursesService {

  public async execute(params: IRequest): Promise<Course[]> {
    const courseRepository = getRepository(Course)

    const where: IRequest = {}

    if (params.id)
      where.id = params.id

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