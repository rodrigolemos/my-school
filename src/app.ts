import { getServerConnection } from './config/typeorm'
import app from './server'

getServerConnection()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`App running on port ${port}...`))
