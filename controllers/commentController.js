const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  const { postId, content } = req.body;

  if (!postId || !content) {
    return res.status(400).send('Invalid request data.');
  }

  try {
    await Comment.create(postId, content);
    res.send('Comment added successfully');
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send('Failed to add comment. Please try again.');
  }
};

exports.getCommentsByPostId = async (req, res) => {
  const postId = req.params.postId;

  try {
    
    const comments = await Comment.getCommentsByPostId(postId);
    res.json(comments); 
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
};
