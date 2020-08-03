'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    userId: DataTypes.INTEGER,
    postPhoto: DataTypes.STRING,
    postDescription: DataTypes.STRING
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
    posts.belongsTo(models.user);
    posts.hasMany(models.like, { foreignKey: 'postsId'})
    posts.hasMany(models.comment, { foreignKey: 'postsId'})



  };
  return posts;
};