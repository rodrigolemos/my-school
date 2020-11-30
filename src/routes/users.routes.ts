import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import { handleResult, setPayloadFormat } from '../middlewares/ensureValidUserRequest'
import UserController from '../controllers/UserController'

const usersRouter = Router()

usersRouter.post('/create', setPayloadFormat, handleResult, UserController.store)

usersRouter.use(ensureAuthentication)

usersRouter.get('/:id?', UserController.index)

export default usersRouter