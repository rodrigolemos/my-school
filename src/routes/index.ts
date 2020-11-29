import { Router } from 'express'
import coursesRouter from './courses.routes'
import studentsRouter from './students.routes'

const routes = Router()

routes.use('/students', studentsRouter)
routes.use('/courses', coursesRouter)

export default routes