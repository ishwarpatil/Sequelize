# install migration:

    npm install --save sequelize
    npm install --save sequelize-cli

init migration:

    node_modules/.bin/sequelize init

Create Table:

    node_modules/.bin/sequelize model:generate --name tblAgent --attributes agentId:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},agentName:{type:Sequelize.STRING(40),allowNull:false},companyName:{type:Sequelize.STRING(40),allowNull:false},street:{type:Sequelize.STRING(50),allowNull:false},zipCode:{type:Sequelize.INTEGER,allowNull:false},classification:{type:Sequelize.CHAR,allowNull:false},warehouseId:{type:Sequelize.INTEGER,allowNull:true},coi:{type:Sequelize.STRING(20),allowNull:false},paymentTerms:{type:Sequelize.TEXT,allowNull:true},creditLimit:{type:Sequelize.DATE,allowNull:false},active:{type:Sequelize.BLOB,allowNull:false,defaultValue: false}


# Migrations:

### In Windows :

    node_modules\.bin\sequelize db:migrate:undo:all
    node_modules\.bin\sequelize db:migrate

    node config\AddAllData.js


### In Ubuntu :

    node_modules/.bin/sequelize db:migrate:undo:all
    node_modules/.bin/sequelize db:migrate

    node config/AddAllData.js



### Most importance files like config.json && db.js
# config.json
change database name in config.json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

# db.js
const Sequelize=require('sequelize');
const sequelize=new Sequelize('test','root','',{
   // host:'192.168.200.80',
    host: 'localhost',
    dialect:'mysql'
});
sequelize.authenticate().then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log('error',err);
});
module.exports=sequelize;



### Check server.js install all packages in server.js like :-
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const router=require('./routes');
const fileUpload = require('express-fileupload');
const path=require('path');
const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.use('/attachment', express.static(path.join(__dirname,"./Attachment/")));

router.route(app);
let port=3007;
app.listen(port,()=>{
    console.log('started server on port ', port);
});

### Create all API in router folder ./router/index.js like :-
let user=require('../component/user/userController');
exports.route=(app)=>{
    //////////////// user ////////////////
    app.post('/api/user',user.addUser);
    app.get('/api/user', user.getUser);
    app.put('/api/user/:userId', user.updateUser);
    app.delete('/api/user/:userId', user.delUser);
};



### Create table through migrations, So create automatic migrations/20180412083625-create-tbl-user.js && models/tbluser.js
# migrations/20180412083625-create-tbl-user.js.
tblUsers :- Table Name Change
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tblUsers', {
            userId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            userName: {type: Sequelize.STRING(40), allowNull: false},
            userHobby: {type: Sequelize.STRING(40), allowNull: false},
            userCity: {type: Sequelize.STRING(40), allowNull: false},
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tblUsers');
    }
};

# models/tbluser.js
tblUser :- Table Name Change
'use strict';
module.exports = (sequelize, DataTypes) => {
    var tblUser = sequelize.define('tblUser', {}, {});
    tblUser.associate = function(models) {
        // associations can be defined here
    };
    return tblUser;
};



### After create model && controller in component folder like :-
# model.js
let sequelize=require('../../config/db');
let Sequelize=require('sequelize');
const user=sequelize.define('tblUser',{
    userId:{
        type:Sequelize.INTEGER(6),
        primaryKey:true
    },
    userName:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    userHobby:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    userCity:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
});
module.exports={user};

# controller.js
let sequelize=require('../../config/db');
let {user}=require('./userModel');

// Insert
exports.addUser=(req,res)=>{
    user.create({
        userName: req.body.userName,
        userHobby: req.body.userHobby,
        userCity: req.body.userCity,

        }).then((ress) => {
            res.send({result: true});
        }).catch((err) => {
            res.send({result: false, error: err});
        })
};

// Select
exports.getUser=(req,res)=>{
    sequelize.query("select * from tblUsers")
        .then((rows) => {
            res.send(rows[0]);
        }).catch(err => {
        res.send({result:false, error:err});
    })
};

// Update
exports.updateUser=(req,res)=>{
    var sql="";
    //sql+=(req.body.agentId===undefined)?"":("agentId='" + req.body.agentId + "', ");
    sql+=(req.body.userName===undefined)?"":("userName='" + req.body.userName + "', ");
    sql+=(req.body.userHobby===undefined)?"":("userHobby='" + req.body.userHobby + "', ");
    sql+=(req.body.userCity===undefined)?"":("userCity= '" + req.body.userCity + "', ");

    sequelize.query("update tblUsers set " + sql.slice(0, -2) + " where userId='" + req.params.userId + "'")
        .then((ress) => {
            res.send({result: true});
        }).catch((err) => {
        res.send({result: false, error: err});
    });
};

// Delete
exports.delUser=(req,res)=>{

    sequelize.query("delete from tblUsers where userId='" + req.params.userId + "'")
        .then((rows) => {
            console.log("Delete : ", rows);
            res.send({result: true});
        }).catch(err => {
        res.send({result: false, error: err});
    });

};


### Fakers Methods
https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html



