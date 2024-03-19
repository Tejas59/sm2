const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();


router.post('/create-comment', commentController.createComment);


router.get('/comments/:postId', commentController.getCommentsByPostId);

module.exports = router;
