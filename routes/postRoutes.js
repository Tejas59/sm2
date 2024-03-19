const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/create-post', postController.createPost);

module.exports = router;
