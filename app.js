const express = require('express');
const ejs = require('ejs'); // Import ejs
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Database connection configuration
const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tejas@555',
  database: 'social_media'
});

// Body parser for form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS as the templating engine and adjust view directory
app.set('view engine', 'ejs');
app.set('views', './public'); // Set the views directory to be inside the public folder

// Routes
app.get('/', async (req, res) => {
  try {
    const [posts] = await pool.query(`
      SELECT p.*, c.content AS comment_content
      FROM posts p
      LEFT JOIN comments c ON p.id = c.post_id
      ORDER BY p.created_at DESC;
    `);

    const formattedPosts = posts.reduce((acc, post) => {
      const existingPost = acc.find(p => p.id === post.id);
      if (existingPost) {
        existingPost.comments.push(post.comment_content);
      } else {
        acc.push({ id: post.id, username: 'User', imageUrl: post.imageUrl, description: post.description, comments: [post.comment_content] });
      }
      return acc;
    }, []);

    res.render('index', { posts: formattedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching posts');
  }
});

app.post('/create-post', async (req, res) => {
  const { imageUrl, description } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO posts (username, imageUrl, description) VALUES (?, ?, ?)', ['Anonymous', imageUrl, description]);
    res.redirect('/'); // Redirect to homepage after successful post creation
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating post');
  }
});

app.post('/create-comment', async (req, res) => {
  const { postId, content } = req.body;
  try {
    await pool.query('INSERT INTO comments (post_id, content) VALUES (?, ?)', [postId, content]);
    res.send('Comment added successfully'); // Or redirect if needed
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding comment');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
