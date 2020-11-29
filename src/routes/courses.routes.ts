import { Router, Request, Response } from 'express'

const coursesRouter = Router()

coursesRouter.get('/list', (req: Request, res: Response) => {
  return res.send({
    hello: 'courses router'
  })
})

export default coursesRouter