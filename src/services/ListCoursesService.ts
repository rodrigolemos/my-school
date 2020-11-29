import { getRepository } from 'typeorm'
import Course from '../models/Course'

class ListCoursesService {

  public async execute(): Promise<Course[]> {
    const courseRepository = getRepository(Course)
    const courses = await courseRepository.find()
    return courses
  }

}

export default ListCoursesService