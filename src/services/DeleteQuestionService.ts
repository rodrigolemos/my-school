import { getRepository } from 'typeorm'
import Question from '../models/Question'

interface IRequest {
  id?: string
  course_id?: string
  order?: number
}

class DeleteQuestionService {

  public async execute(params: IRequest): Promise<boolean> {
    const { id, course_id, order } = params
    const questionRepository = getRepository(Question)

    await questionRepository.delete({
      id,
      course_id,
      order
    })

    return true
  }

}

export default DeleteQuestionService
