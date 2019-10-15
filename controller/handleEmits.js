var express = require('express')
var app =express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const db = require('../model/index')

exports.generalGroup = (req,res,next) => {  
        socket.on('general group message', function(msgs){
            io.emit(msgs)
            console.log(msgs)
            /* db.Group.findOne({ where:{ name:'general'}})
            .then(group =>{
                group.create({messages:msgs})
            }) */
        })
    
}