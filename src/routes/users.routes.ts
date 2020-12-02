import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import ensurePermission from '../middlewares/ensurePermission'
import { handleRouteError } from '../utils/RouteError'
import { setUserFormat } from '../middlewares/ensureValidUserRequest'
import UserController from '../controllers/UserController'

const usersRouter = Router()

// Users can be created from a public form
usersRouter.post('/create', setUserFormat, handleRouteError, UserController.store)

// Only logged in admins can view users
usersRouter.use(ensureAuthentication)
usersRouter.use(ensurePermission)

usersRouter.get('/:id?', UserController.index)

export default usersRouter