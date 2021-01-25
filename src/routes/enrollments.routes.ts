import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import ensurePermission from '../middlewares/ensurePermission'
import ensureOnlyItself from '../middlewares/ensureOnlyItself'
import { handleRouteError } from '../errors/RouteError'
import { setEnrollmentFormat, setUpdateEnrollmentFormat } from '../middlewares/ensureValidEnrollmentRequest'
import EnrollmentController from '../controllers/EnrollmentController'

const enrollmentsRouter = Router()

// Only logged students or teachers can add enrollments
enrollmentsRouter.use(ensureAuthentication)

// Only the own user can enroll to a course
enrollmentsRouter.post('/create', ensureOnlyItself, setEnrollmentFormat, handleRouteError, EnrollmentController.store)

// Only logged in admins can manage enrollments
enrollmentsRouter.use(ensurePermission)

enrollmentsRouter.get('/', EnrollmentController.index)
enrollmentsRouter.put('/', setUpdateEnrollmentFormat, handleRouteError, EnrollmentController.update)
enrollmentsRouter.delete('/', setEnrollmentFormat, handleRouteError, EnrollmentController.delete)

export default enrollmentsRouter
