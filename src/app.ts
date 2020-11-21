import express, { Request, Response } from 'express'

const app: express.Application = express()

app.get('/', (req: Request, res: Response) => {
  return res.send({})
})

app.listen(3000, () => console.log('App running on port 3000...'))
