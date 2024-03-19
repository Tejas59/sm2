const Post = require('../models/post');


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAllWithComments();
    res.render('index', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error fetching posts' });
  }
};


exports.createPost = async (req, res) => {
  const { imageUrl, description } = req.body;
  try {
    await Post.create(imageUrl, description);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating post');
  }
};
