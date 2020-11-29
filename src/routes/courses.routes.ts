import { Router } from 'express'
import CourseController from '../controllers/CourseController'

const coursesRouter = Router()

coursesRouter.get('/list', CourseController.list)

export default coursesRouter