import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import EnrollmentController from '../controllers/EnrollmentController'

const enrollmentsRouter = Router()

enrollmentsRouter.use(ensureAuthentication)

enrollmentsRouter.get('/', EnrollmentController.index)

export default enrollmentsRouter