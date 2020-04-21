// Just a skeleton... doesn't do anything right now

const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

const port = 3000
const topics = [{name: 'NFL Draft', id: 1, playlist: [
  {title: "We're back in the wasteland of Quarantine. XFL is gone and MLB has some weird way of coming back to life", audioUrl: 'https://dts.podtrac.com/redirect.mp3/landmark.barstoolsports.net/pardon-my-take/37655/pmt-4-13-20-podcast-condensed.5bddc30f.mp3', startTime: '9:42', endTime: '18:40'},
  {title: 'I miss sports?', audioUrl: 'http://feeds.soundcloud.com/stream/795187915-scottiedeubler43-episode-127-dustin-paul-bryan-smith.mp3', startTime: '2:34', endTime: '3:45'}
]}, {name: 'MLB Players', id: 2, playlist: [
  {title: "We're back in the wasteland of Quarantine. XFL is gone and MLB has some weird way of coming back to life", audioUrl: 'https://dts.podtrac.com/redirect.mp3/landmark.barstoolsports.net/pardon-my-take/37655/pmt-4-13-20-podcast-condensed.5bddc30f.mp3', startTime: '9:42', endTime: '18:40'},
  {title: 'I miss sports?', audioUrl: 'http://fillmein.com/2', startTime: '2:34', endTime: '3:45'}
]}, {name: 'NBA Playoffs', id: 3, playlist: [
  {title: "We're back in the wasteland of Quarantine. XFL is gone and MLB has some weird way of coming back to life", audioUrl: 'https://dts.podtrac.com/redirect.mp3/landmark.barstoolsports.net/pardon-my-take/37655/pmt-4-13-20-podcast-condensed.5bddc30f.mp3', startTime: '9:42', endTime: '18:40'},
  {title: 'I miss sports?', audioUrl: 'http://fillmein.com/2', startTime: '2:34', endTime: '3:45'}
]}]
app.get('/topics', (req, res) => res.send(topics))

app.get('/topics/:id', (req, res) => res.send(
  topics.find(topic => +req.params.id === topic.id)
))

app.listen(port, () => console.log(`Server live at http://localhost:${port}`))