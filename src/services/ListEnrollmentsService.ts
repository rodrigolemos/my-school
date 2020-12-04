import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'
import AppError from '../errors/AppError'
import FindUserByEmail from './FindUserByEmail'
import FindCourseByName from './FindCourseByName'

interface IRequest {
  user_id?: number
  course_id?: number
  user_email?: string
  course_name?: string
}

class ListEnrollmentsService {

  public async execute(query: IRequest): Promise<Enrollment[]> {
    const enrollmentRepository = getRepository(Enrollment)

    const where: IRequest = {}

    if (query.user_email && !query.user_id) {
      const findUserByEmailService = new FindUserByEmail()
      const user = await findUserByEmailService.execute(query.user_email)
      query.user_id = user.id
    }

    if (query.course_name && !query.course_id) {
      const findCourseByNameService = new FindCourseByName()
      const course = await findCourseByNameService.execute(query.course_name)
      query.course_id = course.id
    }

    if (query.user_id)
      where.user_id = query.user_id

    if (query.course_id)
      where.course_id = query.course_id

    const enrollments = await enrollmentRepository.find({ where, order: { updated_at: 'DESC' } })

    if (!enrollments.length)
      throw new AppError('Enrollments not found for this filter', 404)

    return enrollments
  }

}

export default ListEnrollmentsService