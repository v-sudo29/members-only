require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const localStrategy = require('./passportConfig')
const MongoStore = require('connect-mongo')

const indexRouter = require('./routes/index')
const messageRouter = require('./routes/message')

const app = express()
const mongoDb = process.env.MONGO_DB_URI

// Connect to database
mongoose.connect(mongoDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongo connection error'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
localStrategy(passport)
app.use(cors({
  origin: ['http://localhost:5173', `${process.env.CLIENT_URL}`, '127.0.0.1:5173'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}))
app.use(cookieParser('secretcode')) // use same secret from session as param
// app.use(express.static(path.join(__dirname, 'client/dist')));
const sessionStore = MongoStore.create({
  client: db.getClient(),
  autoRemove: 'native'
})

app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    // sameSite: 'none', // uncomment for deployment
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/message', messageRouter)

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/dist/index.html'))
// })

app.listen(3000, () => console.log('Server is running on port 3000'))