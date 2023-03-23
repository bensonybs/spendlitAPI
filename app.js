if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.use('api/v1', routes)
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => console.log(`Spendlit API listening on port http://localhost:${port}`))