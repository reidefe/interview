const express = require('express')

var passport = require('passport')

const passportJwt = require ('passport-jwt') 

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

var LocalStrategy = require('passport-local').Strategy;

const Jwtstrategy = passportJwt.Strategy;

var app = express()

var Sequelize = require('sequelize')

var { User, Group, Cont, Msg} = require('../model/index')

var bodyparser = require('body-parser')


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));





exports.signup = (req, res, next) => {  
    bcrypt.hash(req.body.password, 10,(err, hash) =>{
        if (err) return res.status(500) .json({
            error: err
        })
        else{
            User.findOrCreate( {where: { handle: req.body.handle }, defaults:{password:hash, email: req.body.email}})
            .then(user => res.json(user)) 
            .then(user =>{
                Group.findAll({ where: {name:'general'}, include: {model: User}})
            })  
                
        }
    })  
   
}




exports.getall = (req, res, next) => {
    User.findAll() .then(user => {
        console.log(user)
        res.send(user)
    }
      
    )
        
}



exports.createGroup = (req,res) => {
    Group.findOrCreate({where:{name:req.body.name}, defaults:{description:req.body.description}})   
    .then(group => {
        console.log(group.name, 'group created') 
        res.send('group created')
        console.log('new group added')
    }) 
}






exports.login = (req,res, next) => {
    User.findOne({ where: { handle: req.body.handle}})
    .then((user, err) =>{
        if(err){
            return res.status(401) .json({
                message: 'auth failed because user doesnt exist'
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) =>{
            if(err){
                return res.status(401) .json({

                    message: 'auth failed to login user',

                    message: 'auth failed to login user due to insufficient or bad credentials'

                })
            } 
            else  {
               const token =  jwt.sign({
                   email: user.email,
                   handle: user.handle                   
               },
               'secret',
               { expiresIn: "10h"},
               );


                res.cookie('jwt', token,{httpOnly:true, secure:true });
                res.status(200) .json({
                    message: 'auth successful for',
                    token: token,
                }) 
            }
            
           
       
        
    })
   /*  .catch(err =>{
        console.log(err);
        res.status(500) .json({
            error: err,
        })
    }); */
})

}
/* 

exports.addtogroup = (req,res, next) =>{
    Group

}

 */