import { Request, Response } from 'express'

class CourseController {

  public async list(req: Request, res: Response) {
    return res.send({
      hello: 'course controller'
    })
  }
}

export default new CourseController
