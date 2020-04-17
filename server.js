const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

const port = 3000

app.get('/topics', (req, res) => res.send([
  {name: 'NFL Draft', id: 1}, {name: 'MLB Players', id: 2}, {name: 'NBA Playoffs', id: 3}
]))

app.listen(port, () => console.log(`Server live at http://localhost:${port}`))