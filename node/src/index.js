require('dotenv').config();

const express = require('express')

const router = require('./routes');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Salary Recap - Backend')
})

app.use('/', router);

app.listen(port, () => {
  console.log(`Salary Recap Backend listening on port ${port}`)
})