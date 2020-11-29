import { getRepository } from 'typeorm'
import Student from '../models/Student'
class ListStudentsService {

  public async execute(): Promise<Student[]> {
    const studentRepository = getRepository(Student)
    const students = await studentRepository.find()
    return students
  }

}

export default ListStudentsService