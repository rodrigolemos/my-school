import { Request, Response } from 'express'
import ListCoursesService from '../services/ListCoursesService'

class CourseController {

  public async index(req: Request, res: Response): Promise<Response> {
    const listCoursesService = new ListCoursesService()
    const courses = await listCoursesService.execute()
    return res.send(courses)
  }

}

export default new CourseController
