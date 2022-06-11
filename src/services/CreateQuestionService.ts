import { getRepository } from 'typeorm'
import Question from '../models/Question'
import Course from '../models/Course'
import User from '../models/User'
import AppError from '../errors/AppError'

class CreateQuestionService {

  public async execute(body: Question): Promise<Question> {
    const { course_id, order, question, alternatives, answers, created_by } = body

    const courseRepository = getRepository(Course)
    const userRepository = getRepository(User)
    const questionRepository = getRepository(Question)

    // Check if course does exist
    const course = await courseRepository.findOne({
      where: {
        id: course_id
      }
    })

    if (!course)
      throw new AppError({
        status: 1,
        message: 'Course not found'
      }, 404)

    // Check if user does exist
    const user = await userRepository.findOne({
      where: {
        id: created_by
      }
    })

    if (!user)
      throw new AppError({
        status: 2, 
        message: 'User not found'
      }, 404)

    const questionCreated = questionRepository.create({
      course_id,
      order,
      question,
      alternatives,
      answers,
      created_by
    })

    await questionRepository.save(questionCreated)

    return questionCreated
  }

}

export default CreateQuestionService
