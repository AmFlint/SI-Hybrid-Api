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
  post.createAndGetAttributes()
    .then(response => res.json(response))
    .catch(err => res.status(400).json({message: err}));
});

router.put('/:id', function(req, res) {
  // get Currently logged user's userId
  const userId = userIdentification(req, res);

  if (!req.params.id) {
    res.status(400).json({status:400, message: 'Post id is required.'})
  }

  Post.find({where: {
    id: req.params.id,
    userId
  }})
    .then(post => {
      return post;
    })
    .then(post => {
      // Set values from request body, validate user input, update post
      // and send back exportable attributes
      post.update(req.body)
        .then(updatedPost => res.json(updatedPost.getExportableAttributes()))
        // Bad Request, validation failed
        .catch(err => res.status(400).json({status: 400, message: err}));
    })
    // Post not found
    .catch(err => res.status(404).json({status: 404, message: 'Post does not exist.'}));
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
