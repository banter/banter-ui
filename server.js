const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

const port = 3000
const topics = [{name: 'NFL Draft', id: 1, playlist: [
  {title: 'When will the season start?', audioUrl: 'http://fillmein.com/1', startTime: '12:34', endTime: '23:45'},
  {title: 'I miss sports?', audioUrl: 'http://fillmein.com/2', startTime: '2:34', endTime: '3:45'},
  {title: 'Give me some baseball plz', audioUrl: 'http://fillmein.com/3', startTime: '1:34', endTime: '2:45'}
]}, {name: 'MLB Players', id: 2, playlist: [
  {title: 'When will the season start?', audioUrl: 'http://fillmein.com/1', startTime: '12:34', endTime: '23:45'},
  {title: 'I miss sports?', audioUrl: 'http://fillmein.com/2', startTime: '2:34', endTime: '3:45'},
  {title: 'Give me some baseball plz', audioUrl: 'http://fillmein.com/3', startTime: '1:34', endTime: '2:45'}
]}, {name: 'NBA Playoffs', id: 3, playlist: [
  {title: 'When will the season start?', audioUrl: 'http://fillmein.com/1', startTime: '12:34', endTime: '23:45'},
  {title: 'I miss sports?', audioUrl: 'http://fillmein.com/2', startTime: '2:34', endTime: '3:45'},
  {title: 'Give me some baseball plz', audioUrl: 'http://fillmein.com/3', startTime: '1:34', endTime: '2:45'}
]}]
app.get('/topics', (req, res) => res.send(topics))

app.get('/topics/:id', (req, res) => res.send(
  topics.find(topic => +req.params.id === topic.id)
))

app.listen(port, () => console.log(`Server live at http://localhost:${port}`))