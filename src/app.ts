import express, { Request, Response } from 'express'
import cors from 'cors'
import routes from './routes'

const app: express.Application = express()

app.use(cors())
app.use(routes)

app.listen(3000, () => console.log('App running on port 3000...'))
