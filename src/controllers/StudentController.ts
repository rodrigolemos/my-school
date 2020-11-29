import { Request, Response } from 'express'
import ListStudentsService from '../services/ListStudentsService'
class StudentController {

  public async list(req: Request, res: Response) {
    const listStudentsService = new ListStudentsService()
    const students = await listStudentsService.execute()
    return res.send(students)
  }
}

export default new StudentController
