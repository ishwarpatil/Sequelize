'use strict';
const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('tblUsers', {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userName: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            userHobby: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            userCity: {
                type: Sequelize.STRING(40),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(function() {
            let sql="";
            for(let i=0;i<5;i++)
                sql+="('"+faker.name.firstName()+"', '"+faker.random.arrayElement(["reading", "writing", "cricket"])+"', '"+faker.address.city()+"'),";
            return queryInterface.sequelize.query("Insert into tblUsers(userName, userHobby, userCity) values"+sql.slice(0, -1)+";")
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tblUsers');
    }
};