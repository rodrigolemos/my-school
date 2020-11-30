import { Request, Response } from 'express'
import CreateSessionService from '../services/CreateSessionService'

class SessionController {

  public async store(req: Request, res: Response): Promise<Response> {
    const createSessionService = new CreateSessionService()
    const session = await createSessionService.execute(req.body)
    return res.status(201).send(session)
  }

}

export default new SessionController
