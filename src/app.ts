import createConnection from './config/typeorm'
import app from './server'

createConnection()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`App running on port ${port}...`))
