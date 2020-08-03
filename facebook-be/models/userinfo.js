'use strict';
module.exports = (sequelize, DataTypes) => {
  const userInfo = sequelize.define('userInfo', {
    userId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    age: DataTypes.INTEGER,
    DOB: DataTypes.STRING
  }, {});
  userInfo.associate = function(models) {
    // associations can be defined here
    userInfo.belongsTo(models.user)
  };
  return userInfo;
};