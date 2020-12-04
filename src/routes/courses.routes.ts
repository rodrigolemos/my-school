import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import ensurePermission from '../middlewares/ensurePermission'
import { handleRouteError } from '../errors/RouteError'
import { setAddCourseFormat, setDeleteCourseFormat, setUpdateCourseFormat } from '../middlewares/ensureValidCourseRequest'
import CourseController from '../controllers/CourseController'

const coursesRouter = Router()

// Courses can be listed from a public page
coursesRouter.get('/:id?', CourseController.index)

// Only logged in admins can manage courses
coursesRouter.use(ensureAuthentication)
coursesRouter.use(ensurePermission)

coursesRouter.post('/create', setAddCourseFormat, handleRouteError, CourseController.store)
coursesRouter.put('/', setUpdateCourseFormat, handleRouteError, CourseController.update)
coursesRouter.delete('/:id', setDeleteCourseFormat, handleRouteError, CourseController.delete)

export default coursesRouter
