import { Request, Response } from 'express'

import ListQuestionsService from '../services/ListQuestionsService'
import CreateQuestionService from '../services/CreateQuestionService'
import DeleteQuestionService from '../services/DeleteQuestionService'

class QuestionController {

  public async index(req: Request, res: Response): Promise<Response> {
    const listQuestionsService = new ListQuestionsService()
    const questions = await listQuestionsService.execute(req.params)
    return res.send(questions)
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const createQuestionService = new CreateQuestionService()
    const question = await createQuestionService.execute(req.body)
    return res.status(201).send(question)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteQuestionService = new DeleteQuestionService()
    await deleteQuestionService.execute(req.body)
    return res.status(204).send()
  }

}

export default new QuestionController
