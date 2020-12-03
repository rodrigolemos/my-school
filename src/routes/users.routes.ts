import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import ensurePermission from '../middlewares/ensurePermission'
import ensureOnlyItself from '../middlewares/ensureOnlyItself'
import { handleRouteError } from '../errors/RouteError'
import { setAddUserFormat, setUpdateUserFormat, setDeleteUserFormat } from '../middlewares/ensureValidUserRequest'
import UserController from '../controllers/UserController'

const usersRouter = Router()

// Users can be created from a public form
usersRouter.post('/create', setAddUserFormat, handleRouteError, UserController.store)

usersRouter.use(ensureAuthentication)

// Only the own user can update its information
usersRouter.put('/', ensureOnlyItself, setUpdateUserFormat, handleRouteError, UserController.update)

// Only logged in admins can view users
usersRouter.get('/:id?', ensurePermission, UserController.index)

// Only logged in admins can delete an user
usersRouter.delete('/:id', ensurePermission, setDeleteUserFormat, handleRouteError, UserController.delete)

export default usersRouter