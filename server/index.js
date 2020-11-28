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
        maxAge: 1000 * 60 * 60 * 24
        /*24 hours*/
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log("db connected")
})

//Below: ALL axios calls routed through AUTHcontroller
app.post('/api/createAccount', authCtrl.createAccount)
app.post('/api/login', authCtrl.login)
app.post('/api/logout', authCtrl.logout)

//Below: axios POST calls routed through MAINcontroller
app.post('/api/posts', mainCtrl.submitPost)
app.post('/api/followinglist/userid/:userid/friendid/:friendid', mainCtrl.createFollowingPair)

//Below: axios GET calls routed through MAINcontroller
app.get('/api/landingpage/personid/:personid', mainCtrl.getLandingPageInfo)
app.get('/api/pages/personid/:personid', mainCtrl.getPersonsPageIdAndNames)
app.get('/api/personid/:personid', mainCtrl.getCurrentUser)
app.get('/api/personid/:personid/pageid/:pageid', mainCtrl.getCurrentPage) 
app.get('/api/friendAndUserList/:searchParameterFromInput', mainCtrl.displayFriends)
app.get('/api/friendAndUserList', mainCtrl.displayFriends)
app.get('/api/feed', mainCtrl.getFeed)
app.get('/api/userRelationship/:userPersonId/:individualFriendPersonId', mainCtrl.followingOrNotFollowing)

//Below: axios PUT calls routed through MAINcontroller
app.put('/api/personid/:personid/settings', mainCtrl.editPersonalSettings)

//Below: axios DELETE calls routed through MAINcontroller
// app.delete('/api/followinglist/userid/:userid/friendid/:friendid', mainCtrl.deleteFollowingPair)



app.listen(SERVER_PORT, () => {
    console.log(`Listening on Port ${SERVER_PORT}`)
})