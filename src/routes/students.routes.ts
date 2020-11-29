import { Router } from 'express'
import StudentController from '../controllers/StudentController'

const studentsRouter = Router()

studentsRouter.get('/list', StudentController.list)

export default studentsRouter