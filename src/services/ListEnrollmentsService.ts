import { getRepository } from 'typeorm'
import Enrollment from '../models/Enrollment'

class ListEnrollmentsService {

  public async execute(): Promise<Enrollment[]> {
    const enrollmentRepository = getRepository(Enrollment)
    const enrollments = await enrollmentRepository.find()
    return enrollments
  }

}

export default ListEnrollmentsService