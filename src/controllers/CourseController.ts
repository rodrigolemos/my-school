import { Request, Response } from 'express'
import ListCoursesService from '../services/ListCoursesService'
import CreateCourseService from '../services/CreateCourseService'

class CourseController {

  public async index(req: Request, res: Response): Promise<Response> {
    const listCoursesService = new ListCoursesService()
    const courses = await listCoursesService.execute()
    return res.send(courses)
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const createCourseService = new CreateCourseService()
    const course = await createCourseService.execute(req.body)
    return res.status(201).send(course)
  }

}

export default new CourseController
