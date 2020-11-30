import { Router } from 'express'
import EnrollmentController from '../controllers/EnrollmentController'

const enrollmentsRouter = Router()

enrollmentsRouter.get('/', EnrollmentController.index)

export default enrollmentsRouter