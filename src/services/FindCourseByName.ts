import { getRepository, Like } from 'typeorm'
import AppError from '../errors/AppError'
import Course from '../models/Course'

class FindCourseByName {

  public async execute(name: string): Promise<Course> {
    const courseRepository = getRepository(Course)

    const courseRegistered = await courseRepository.findOne({
      where: {
        name: Like(`%${name}%`)
      }
    })

    if (!courseRegistered)
      throw new AppError('Course not found', 404)

    return courseRegistered
  }

}

export default FindCourseByName
