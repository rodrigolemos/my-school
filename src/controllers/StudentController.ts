import { Request, Response } from 'express'

class StudentController {

  public async list(req: Request, res: Response) {
    return res.send({
      hello: 'student controller'
    })
  }
}

export default new StudentController
