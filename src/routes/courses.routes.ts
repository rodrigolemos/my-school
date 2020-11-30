import { Router } from 'express'
import CourseController from '../controllers/CourseController'

const coursesRouter = Router()

coursesRouter.get('/:id?', CourseController.index)

export default coursesRouter