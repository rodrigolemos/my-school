import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'
import AppError from '../errors/AppError'
import FindUserByEmail from './FindUserByEmail'
import FindCourseByName from './FindCourseByName'

interface IRequestQuery {
  user_id?: number
  course_id?: number
  user_email?: string
  course_name?: string
}

interface IRequestParams {
  id?: number
}
class ListEnrollmentsService {

  public async execute(query: IRequestQuery, params: IRequestParams): Promise<Enrollment[]> {
    const enrollmentRepository = getRepository(Enrollment)

    const where: IRequestQuery = {}

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

    if (query.user_id || params.id) {
      where.user_id = query.user_id || params.id
    }

    if (query.course_id)
      where.course_id = query.course_id

    const enrollments = await enrollmentRepository.find({ where, order: { updated_at: 'DESC' } })

    if (!enrollments.length)
      throw new AppError({
        status: 1,
        message: 'Enrollments not found for this filter'
      }, 404)

    return enrollments
  }

}

export default ListEnrollmentsService