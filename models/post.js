'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title can\' be empty.'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'content can\' be empty.'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 150],
          msg: 'Please fill in a location for the place you are sharing.'
        },
        notEmpty: {
          msg: 'Location can\' be empty.'
        }
      }
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defautValue: 1,
      validate: {
        min: {
          args: 1,
          msg: 'Minimum value for difficulty is 1.'
        },
        max: {
          args: 5,
          msg: 'Maximum value for difficulty is 5.'
        }
      }
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

  /**
   * Get a Post's exportable attributes
   * @return {object} - the Post's attributes
   */
  Post.prototype.getExportableAttributes = function() {
    return this.get();
  };

  /**
   * Create a Post method and get its exportable Attributes
   * @returns {Promise} - return Post's exportable attributes if entity created
   * otherwhise rejects the error
   */
  Post.prototype.createAndGetAttributes = function() {
    return new Promise((resolve, reject) => {
      Post.create(this.get())
        .then(post => {
          return resolve(post.getExportableAttributes());
        })
        .catch(error => {
          return reject(error);
        });
    });
  };
  
  return Post;
};