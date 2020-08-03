'use strict';
module.exports = (sequelize, DataTypes) => {
  const follower = sequelize.define('follower', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  follower.associate = function(models) {
    // associations can be defined here
  };
  return follower;
};