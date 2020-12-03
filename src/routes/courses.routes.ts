import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import ensurePermission from '../middlewares/ensurePermission'
import { handleRouteError } from '../errors/RouteError'
import { setCourseFormat } from '../middlewares/ensureValidCourseRequest'
import CourseController from '../controllers/CourseController'

const coursesRouter = Router()

// Courses can be listed from a public page
coursesRouter.get('/:id?', CourseController.index)

// Only logged in admins can create courses
coursesRouter.use(ensureAuthentication)
coursesRouter.use(ensurePermission)

coursesRouter.post('/create', setCourseFormat, handleRouteError, CourseController.store)

export default coursesRouter