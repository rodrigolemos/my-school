import { getRepository } from 'typeorm'
import Question from '../models/Question'
import AppError from '../errors/AppError'

interface IRequest {
  course_id?: string
}

class ListQuestionsService {

  public async execute(params: IRequest): Promise<Question[]> {
    const questionRepository = getRepository(Question)

    const where = {
      course_id: params.course_id
    }

    const questions = await questionRepository.find({ where, order: { order: 'ASC' } })

    if (!questions.length)
      throw new AppError({
        status: 1,
        message: 'Questions not found for this course'
      }, 404)

    return questions
  }

}

export default ListQuestionsService