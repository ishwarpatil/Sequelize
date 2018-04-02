let user=require('../component/user/userController');


exports.route=(app)=>{

    //////////////// user ////////////////
    app.post('/api/user',user.addUser);
    app.get('/api/user', user.getUser);
    app.put('/api/user/:userId', user.updateUser);
    app.delete('/api/user/:userId', user.delUser);
};
