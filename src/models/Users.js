const { DataTypes } = require('sequelize');

module.exports = sequelize => {
   sequelize.define('Usuario', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        username : {
          type: DataTypes.STRING
        },
      },{
        timestamps: false
      });
     };
     
