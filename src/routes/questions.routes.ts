import { Router } from 'express'
import ensureAuthentication from '../middlewares/ensureAuthentication'
import ensurePermission from '../middlewares/ensurePermission'
import { handleRouteError } from '../errors/RouteError'
import { setAddQuestionFormat, setDeleteQuestionFormat } from '../middlewares/ensureValidQuestionRequest'
import QuestionController from '../controllers/QuestionController'

const questionsRouter = Router()

// Questions can be listed from a public page
questionsRouter.get('/:course_id', QuestionController.index)

// Only logged in admins can manage questions
questionsRouter.use(ensureAuthentication)
questionsRouter.use(ensurePermission)

questionsRouter.post('/create', setAddQuestionFormat, handleRouteError, QuestionController.store)
questionsRouter.delete('/', setDeleteQuestionFormat, handleRouteError, QuestionController.delete)

export default questionsRouter
