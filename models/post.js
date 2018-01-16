'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {

      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [20, 150],
          msg: 'Please fill in a location for the place you are sharing.'
        }
      }
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defautValue: 1
    }
  });

  Post.associate = function(models) {
    models.posts.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Post;
};