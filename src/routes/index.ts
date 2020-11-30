import { Router } from 'express'
import coursesRouter from './courses.routes'
import enrollmentsRouter from './enrollments.routes'
import sessionRouter from './sessions.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/courses', coursesRouter)
routes.use('/enrollments', enrollmentsRouter)
routes.use('/sessions', sessionRouter)

export default routes