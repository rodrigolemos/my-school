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

    const courses = await courseRepository.find({ where })

    if (!courses.length)
      throw new AppError('Courses not found for this filter', 404)

    const foundCourses = courses.map(course => {
      delete course.created_by
      return course
    })
    return foundCourses
  }

}

export default ListCoursesService