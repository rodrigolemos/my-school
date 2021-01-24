import 'reflect-metadata'
import './config/typeorm'
import 'express-async-errors'
import AppError from './errors/AppError'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import routes from './routes'

const app: express.Application = express()

app.use(cors())

// It validates middleware config such as xss and referrer policy
app.use(helmet())

// It limits requests payload size
app.use(express.json({ limit: '10kb' }))

// It limits request quantity from the same IP in a period
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(limiter)

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

app.listen(process.env.PORT || 3000, () => console.log('App running on port 3000...'))
