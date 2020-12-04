import { Request, Response } from 'express'

import ListCoursesService from '../services/ListCoursesService'
import CreateCourseService from '../services/CreateCourseService'
import UpdateCourseService from '../services/UpdateCourseService'
import DeleteCourseService from '../services/DeleteCourseService'

class CourseController {

  public async index(req: Request, res: Response): Promise<Response> {
    const listCoursesService = new ListCoursesService()
    const courses = await listCoursesService.execute(req.params)
    return res.send(courses)
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const createCourseService = new CreateCourseService()
    const course = await createCourseService.execute(req.body)
    return res.status(201).send(course)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const updateCourseService = new UpdateCourseService()
    const course = await updateCourseService.execute(req.body)
    return res.send(course)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteCourseService = new DeleteCourseService()
    await deleteCourseService.execute(req.params.id)
    return res.status(204).send()
  }

}

export default new CourseController
