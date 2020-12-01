import { Request, Response, Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import ensurePermission from '../middlewares/ensurePermission'
import { handleRouteError } from '../utils/RouteError'
import { setCourseFormat } from '../middlewares/ensureValidCourseRequest'
import CourseController from '../controllers/CourseController'

const coursesRouter = Router()

coursesRouter.use(ensureAuthentication)

coursesRouter.get('/:id?', CourseController.index)

coursesRouter.use(ensurePermission)

coursesRouter.post('/create', setCourseFormat, handleRouteError, CourseController.store)

export default coursesRouter