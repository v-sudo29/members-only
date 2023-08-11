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
app.use(cors({
  origin: ['http://localhost:5173', `${process.env.CLIENT_URL}`],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}))

app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('secretcode')) // use same secret from session as param
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
localStrategy(passport)
const sessionStore = MongoStore.create({
  client: db.getClient(),
})
app.use(session({
  secret: 'secretcode',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    sameSite: 'none',
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/message', messageRouter)

app.listen(3000, () => console.log('Server is running on port 3000'))