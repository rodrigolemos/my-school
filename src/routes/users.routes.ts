import { Router } from 'express'
import UserController from '../controllers/UserController'

const usersRouter = Router()

usersRouter.get('/:id?', UserController.index)

export default usersRouter