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