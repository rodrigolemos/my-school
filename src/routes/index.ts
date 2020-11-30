import { Router } from 'express'
import coursesRouter from './courses.routes'
import enrollmentsRouter from './enrollments.routes'
import studentsRouter from './students.routes'

const routes = Router()

routes.use('/students', studentsRouter)
routes.use('/courses', coursesRouter)
routes.use('/enrollments', enrollmentsRouter)

export default routes