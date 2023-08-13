const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Salary Recap - Backend')
})

app.listen(port, () => {
  console.log(`Salary Recap Backend listening on port ${port}`)
})