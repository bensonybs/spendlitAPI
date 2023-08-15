if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')

const routes = require('./routes')
const passport = require('./config/passport')
const swaggerFile = fs.readFileSync('./swagger.yaml', 'utf-8')
const swaggerDocument = YAML.parse(swaggerFile)
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(passport.initialize())
// APIs routers
app.use('/api/v1', routes)
// APIs Document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// Test route for the service
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => console.log(`Spendlit API listening on port http://localhost:${port}`))