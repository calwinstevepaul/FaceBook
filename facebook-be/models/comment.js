'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    postsId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    comment.belongsTo(models.user);

  };
  return comment;
};