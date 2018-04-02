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



