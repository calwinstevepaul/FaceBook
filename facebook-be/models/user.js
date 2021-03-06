'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePic: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.userInfo);
    user.hasMany(models.posts);
    user.hasMany(models.comment);

    
  };
  return user;
};