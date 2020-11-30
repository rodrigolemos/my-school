import { Router } from 'express'
import StudentController from '../controllers/StudentController'

const studentsRouter = Router()

studentsRouter.get('/:id?', StudentController.index)

export default studentsRouter