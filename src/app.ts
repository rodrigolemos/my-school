import 'reflect-metadata'
import './config/typeorm'
import 'express-async-errors'
import AppError from './errors/AppError'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import routes from './routes'

const app: express.Application = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, _req: Request, response: Response, _: NextFunction) => {
  console.error(err)
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3000, () => console.log('App running on port 3000...'))
