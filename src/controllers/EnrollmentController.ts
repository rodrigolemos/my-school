import { Request, Response } from 'express'
import ListEnrollmentsService from '../services/ListEnrollmentsService'


class EnrollmentController {

  public async index(req: Request, res: Response): Promise<Response> {
    const listEnrollmentsService = new ListEnrollmentsService()
    const enrollments = await listEnrollmentsService.execute()
    return res.send(enrollments)
  }

}

export default new EnrollmentController