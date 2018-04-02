'use strict';
module.exports = (sequelize, DataTypes) => {
    var tblUser = sequelize.define('tblUser', {}, {});
    tblUser.associate = function(models) {
        // associations can be defined here
    };
    return tblUser;
};