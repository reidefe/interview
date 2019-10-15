var Sequelize = require('sequelize')
var express = require('express')
var app =express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const passportJwt = require ('passport-jwt') 
const Jwtstrategy = passportJwt.Strategy;
const jwt = require('jsonwebtoken')

var bodyparser = require('body-parser')
var contrl = require('./controller/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;


const events = require('./controller/handleEmits')
const auth = require('./controller/passportSetup')

var { User, Group, Cont, Msg} = require('./model/')

const port = process.env.PORT || 8080
app.use(bodyparser.json())


http.listen(port,() =>{
    console.log('server started')})






app.get('/', function(req, res,) {
    res.sendFile(__dirname+ '/ind.html')    

}) 
app.post('/login',  contrl.login, function(req, res){
    res.redirect('/')
} )
app.post('/signup', contrl.signup)

/* 
app.post('/makegroup', passport.use('jwt', {session: false}),  //contrl.createGroup
    
        contrl.createGroup
 
)  */
app.get('/users', contrl.getall)
app.get('/generalgroup?', function(req,res){
    res.sendFile(__dirname+ '/index.html')
})

app.post('/makegroups',  contrl.createGroup)





io.on('connection', function(socket){   

    //general group messaging
    socket.on('general group message', function(msgs){
        console.log(msgs)
        io.emit('general group message',msgs)   
        Group.create({where:{name:'general'}, defaults:{message:msgs},  include:[User]}) .then(group =>{
                
        })
    })   
})

