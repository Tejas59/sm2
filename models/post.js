const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tejas@555',
  database: 'social_media'
});

class Post {
  static async getAllWithComments() {
    const [posts] = await pool.query(`
      SELECT p.*, c.content AS comment_content
      FROM posts p
      LEFT JOIN comments c ON p.id = c.post_id
      ORDER BY p.created_at DESC;
    `);

    return posts.reduce((acc, post) => {
      const existingPost = acc.find(p => p.id === post.id);
      if (existingPost) {
        existingPost.comments.push(post.comment_content);
      } else {
        acc.push({ id: post.id, username: 'Anonymous', imageUrl: post.imageUrl, description: post.description, comments: [post.comment_content] });
      }
      return acc;
    }, []);
  }

  static async create(imageUrl, description) {
    await pool.query('INSERT INTO posts (username, imageUrl, description) VALUES (?, ?, ?)', ['Anonymous', imageUrl, description]);
  }
}

module.exports = Post;
