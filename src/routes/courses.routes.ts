import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import CourseController from '../controllers/CourseController'

const coursesRouter = Router()

coursesRouter.use(ensureAuthentication)

coursesRouter.get('/:id?', CourseController.index)

export default coursesRouter