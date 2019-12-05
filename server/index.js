require('dotenv').config({path:__dirname+'/../.env'})
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')
const mainCtrl = require('./controllers/mainController')
const app = express()

app.use(express.json())
app.use(session({
    resave: false, 
    saveUninitialized: false, 
    secret: SESSION_SECRET, 
    cookie: {
        maxAge: 1000 * 60 * 60
        /*One hour*/
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log("db connected")
})

app.post('/api/createAccount', authCtrl.createAccount)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on Port ${SERVER_PORT}`)
})