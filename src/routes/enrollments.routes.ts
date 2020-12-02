import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import ensurePermission from '../middlewares/ensurePermission'
import { handleRouteError } from '../utils/RouteError'
import { setEnrollmentFormat } from '../middlewares/ensureValidEnrollmentRequest'
import EnrollmentController from '../controllers/EnrollmentController'

const enrollmentsRouter = Router()

// Only logged in admins can manage enrollments
enrollmentsRouter.use(ensureAuthentication)
enrollmentsRouter.use(ensurePermission)

// TODO: filter by course or user
enrollmentsRouter.get('/', EnrollmentController.index)
enrollmentsRouter.post('/create', setEnrollmentFormat, handleRouteError, EnrollmentController.store)

export default enrollmentsRouter