const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const path = require('path')

app.use(cors())

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//Port Setup....
const port = 5000

app.use(express.static(path.join(__dirname, 'client/build')));

// Route Setup...
const users = require('./routes/api/users')
const readings = require('./routes/api/readings')
const alerts = require('./routes/api/alerts')

//config DB..
const db = require('./config/keys.js').mongoURI

//Connect to mongoDB...
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err))

//passport middleware
app.use(passport.initialize())

//passport config
require('./config/passport')(passport)

//attach route to url
app.use('/api/users', users)
app.use('/api/readings', readings)
app.use('/api/alerts', alerts)

//Root route
app.get('/', (req, res) => {
    res.send('Root route of server')
})

app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/client/build/index.html')); })

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'client/build/index.html')); })
}
//Start Server....
const server = app.listen(port, () => {
    `server started on ${port}`
})



//integrating socket.io with server
const io = require('socket.io')(server)

//Initialize socket connect connection
io.on('connection', function (socket) {
    console.log('a user connected')
    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
})

app.set('socketio', io)