'use strict';
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
    userId: DataTypes.INTEGER,
    postsId: DataTypes.INTEGER
  }, {});
  like.associate = function(models) {
    // associations can be defined here
    // like.belongsTo(models.posts, {foreign_key: 'postsId'});
  };
  return like;
};