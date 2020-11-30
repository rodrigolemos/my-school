import { Router } from 'express'
import SessionController from '../controllers/SessionController'

const sessionRouter = Router()

sessionRouter.post('/create', SessionController.store)

export default sessionRouter
