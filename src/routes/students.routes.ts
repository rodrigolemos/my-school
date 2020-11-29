import { Router, Request, Response } from 'express'

const studentsRouter = Router()

studentsRouter.get('/list', (req: Request, res: Response) => {
  return res.send({
    hello: 'students router'
  })
})

export default studentsRouter