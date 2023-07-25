const Sequelize=require('sequelize');

const sequelize=require('../DataBase/database');

const user=sequelize.define('users',{

    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },

    username:{
        type:Sequelize.STRING,
        allowNull:false
    },

    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }, 
    isPremium:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    totalExpense:{
        type: Sequelize.DECIMAL(10, 2), 
    }
})

module.exports=user;