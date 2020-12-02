import { getRepository } from 'typeorm'
import Course from '../models/Course'

interface IRequest {
  id?: string
}

class ListCoursesService {

  public async execute(params: IRequest): Promise<Course[]> {
    const courseRepository = getRepository(Course)

    const where: IRequest = {}

    if (params.id)
      where.id = params.id

    const courses = await courseRepository.find({ where })
    const foundCourses = courses.map(course => {
      delete course.created_by
      return course
    })
    return foundCourses
  }

}

export default ListCoursesService