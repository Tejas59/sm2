const express = require('express');
const ejs = require('ejs');
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
app.use(bodyParser.json());

// Set EJS as the templating engine and adjust view directory
app.set('view engine', 'ejs');
app.set('views', './public');

// Routes
app.get('/', async (req, res) => {
  try {
    const [posts] = await pool.query(`
      SELECT p.*,
             (SELECT JSON_ARRAYAGG(JSON_OBJECT('content', c.content, 'created_at', c.created_at)) AS comments
              FROM comments c
              WHERE c.post_id = p.id) AS post_comments
      FROM posts p
      GROUP BY p.id
      ORDER BY p.created_at DESC;
    `);

    console.log("Posts from database:", posts); // Log the posts data

    const formattedPosts = posts.map(post => ({
      id: post.id,
      imageUrl: post.imageUrl,
      description: post.description,
      comments: post.post_comments ? post.post_comments : [] // Use post_comments object directly
    }));

    console.log("Formatted posts:", formattedPosts); // Log the formatted posts data

    res.render('index', { posts: formattedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error: 'Error fetching posts' });
  }
});

app.post('/create-comment', async (req, res) => {
  const { postId, content } = req.body;

  if (!postId || !content) {
    return res.status(400).send('Invalid request data.');
  }

  try {
    await pool.query('INSERT INTO comments (post_id, content) VALUES (?, ?)', [postId, content]);
    res.send('Comment added successfully');
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send('Failed to add comment. Please try again.');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
