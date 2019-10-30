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

const https = require('https')
const fs = require('fs')


const events = require('./controller/handleEmits')
const auth = require('./controller/checkAuth')

var { User, Group, Cont, Msg} = require('./model/')

const port = process.env.PORT || 8080
app.use(bodyparser.json())


http.listen(port,() =>{
    console.log('server started')
})


app.get('/', function(req, res,) {
    res.sendFile(__dirname+ '/ind.html')    

}) 
app.post('/login',  contrl.login, function(req, res){
    res.redirect('/')
} )
app.post('/signup', contrl.signup)

app.get('/users', contrl.getall)
app.get('/generalgroup?', function(req,res){
    res.sendFile(__dirname+ '/index.html')
})
app.post('/makegroups', auth.wellAgain,  contrl.createGroup)

io.on('connection', function(socket){ 
    //general group messaging
    socket.join('general group')
    socket.on('general group message', function(msgs){
        console.log(msgs)
        io.emit('general group message',msgs)   
        Group.create({where:{name:'general'}, defaults:{message:msgs},  include:[User]}) .then(group =>{                
        })
    })   
})
/* 

//first test at making a private msg in socket.io
const pv = io.of('/private-chat')
pv.on('connection', function(socket){
    socket.join('group message')
    socket.on('private-chat', function(msgs){
        io.emit('private-chat', msgs )
    })        
})

 */