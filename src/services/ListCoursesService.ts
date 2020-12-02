import { getRepository } from 'typeorm'
import Course from '../models/Course'

class ListCoursesService {

  public async execute(): Promise<Course[]> {
    const courseRepository = getRepository(Course)
    const courses = await courseRepository.find()
    const foundCourses = courses.map(course => {
      delete course.created_by
      return course
    })
    return foundCourses
  }

}

export default ListCoursesService