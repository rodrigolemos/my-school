import { Request, Response } from 'express'

import ListEnrollmentsService from '../services/ListEnrollmentsService'
import CreateEnrollmentService from '../services/CreateEnrollmentService'
import DeleteEnrollmentService from '../services/DeleteEnrollmentService'

class EnrollmentController {

  public async index(req: Request, res: Response): Promise<Response> {
    const listEnrollmentsService = new ListEnrollmentsService()
    const enrollments = await listEnrollmentsService.execute(req.query)
    return res.send(enrollments)
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const createEnrollmentService = new CreateEnrollmentService()
    const enrollment = await createEnrollmentService.execute(req.body)
    return res.send(enrollment)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteEnrollmentService = new DeleteEnrollmentService()
    await deleteEnrollmentService.execute(req.body)
    return res.status(204).send()
  }

}

export default new EnrollmentController