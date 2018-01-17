const express = require('express');
const router = express.Router();
const models = require('../models');
const authenticationMiddleware = require('../middleware/token');
const userIdentification = require('../helpers/userIdentification');
const Post = models.posts;

// Check for authentication token
router.use(authenticationMiddleware);

router.post('/', function(req, res) {
  // retrieve user id from authentication token
  const userId = userIdentification(req, res);
  // Create a post from request body
  const post = new Post(req.body);

  // Link post to authenticated user
  post.userId = userId;
  // Validate data, create a post and send either post's attributes or errors
  Post.create(post.get())
    .then(post => res.json(post.getExportableAttributes()))
    .catch(error => res.status(400).json({status: 400, error}));
});

router.get('/', function(req, res) {
  Post.findAll()
    .then(posts => {
      console.log(posts);
      const exportablesPosts = posts.map(post => post.getExportableAttributes());
      res.json(exportablesPosts);
    })
    .catch(error => res.status(400).json({status: 400, message: error}));
});



module.exports = router;
