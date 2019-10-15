const Sequelize = require('sequelize');
const user = require('./userModel')
const group = require('./groupModel');
const msg = require('./mesgModel');
const cont = require('./contModel');


const path = 'mysql://60Xg6d2IPf:cEHie55bnr@remotemysql.com:3306/60Xg6d2IPf';

const sequelize = new Sequelize( path, { operatorAliases: false} ); 
 

const userTag = sequelize.define('user_tag', {});


const User = user(sequelize, Sequelize)
const Group = group(sequelize, Sequelize)
const Msg = msg(sequelize, Sequelize)
const Cont = cont(sequelize, Sequelize)





Group.belongsToMany(User, { through: userTag, unique: false } )


Group.hasMany(User, )

User.hasMany(Msg, )
Msg.belongsTo(User, )


User.hasMany(Cont,)





sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })


  module.exports = {
    User,
    Group,
    Msg,
    Cont
  }

  