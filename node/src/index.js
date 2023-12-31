require('dotenv').config();

const express = require('express')

const router = require('./routes');

const app = express();
const port = 8080;

app.use(express.json());
 
app.use('/', router);

app.get('/', (req, res) => {
  res.send('Salary Recap - Backend')
});

app.listen(port, () => {
  console.log(`Salary Recap Backend listening on port ${port}`)
});