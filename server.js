
const express = require('express')
const app = express()
app.use(express.static('docs'))

app.get('*', (req, res) => {
  res.sendFile('docs/index.html')
})

app.listen(3000)
