const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

const port = 3000
const topics = [{name: 'NFL Draft', id: 1}, {name: 'MLB Players', id: 2}, {name: 'NBA Playoffs', id: 3}]

app.get('/topics', (req, res) => res.send(topics))

app.get('/topics/:id', (req, res) => res.send(
  topics.find(topic => +req.params.id === topic.id)
))

app.listen(port, () => console.log(`Server live at http://localhost:${port}`))