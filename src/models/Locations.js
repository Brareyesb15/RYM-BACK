const { DataTypes } = require('sequelize');

module.exports = sequelize => {
   sequelize.define('Location', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        dimension: {
          type: DataTypes.STRING,
        },
        type :{
          type:DataTypes.STRING
        }
    },{
        timestamps: false
      });
     };
     
