const express = require('express')

const React = require('react')

const ReactEngine = require('express-react-views')

const app = express()

//Create the engine
const engine = ReactEngine.createEngine({ beautify: true })

//set the engine
app.engine('.jsx', engine)

// set views directory
app.set('views', './views')

//set js as the views engine
app.set('view engine', 'jsx')


app.get('/', (req, res, next) => {
  res.render('verify', { });
})

app.listen(3002, () => {
  console.log('listening to port 3002');
})
