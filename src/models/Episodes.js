const { DataTypes } = require('sequelize');

module.exports = sequelize => {
   sequelize.define("Episode", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        air_date: {
          type: DataTypes.DATE,
          allowNull: false
        },
        episode: {
          type: DataTypes.STRING,
        },
    },{
        timestamps: false
      });
     };
     
