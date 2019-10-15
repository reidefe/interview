const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var express = require('express')
var app =express()

const cookieParser = require('cookie-parser');
app.use(cookieParser());
/* 

exports.auth = passport.use(new JWTStrategy({
    JwtFromRequest: req => require.cookies.jwt,
    secretorKey: 'touchdown'
    },
     (jwtPayLoad, done) => {
         if(jwtPayLoad.expires > Date.now()){
             return done('jwt expired')
         }
         return done(null, jwtPayLoad)
     }

));
 */


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey = 'secret';


passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
        return console.log('authenticated')
    });
}));


exports.auth0 = (req,res) => {
    var token = null;
    if (req && req.cookies){
        token= req.cookies['JWT'];
    }
    return token;
}


exports.auth2 = (req,res) => {
    jwt.verify(req.token, 'secret', (err, authorizedData) =>{
        if (err){
            console.log('couldnt connected to the said route')
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'success',
                authorizedData
            })
        }
    })
}