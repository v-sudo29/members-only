const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.get('/', (req, res) => {
  res.json('Hello there!')
})

app.listen(3000, () => console.log('Server is running on port 3000'))