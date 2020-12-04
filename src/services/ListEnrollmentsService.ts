import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'
import AppError from '../errors/AppError'

interface IRequest {
  user_id?: number
  course_id?: number
}

class ListEnrollmentsService {

  public async execute(query: IRequest): Promise<Enrollment[]> {
    const enrollmentRepository = getRepository(Enrollment)

    const where: IRequest = {}

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