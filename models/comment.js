

const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tejas@555',
  database: 'social_media'
});

class Comment {
  static async create(postId, content) {
    await pool.query('INSERT INTO comments (post_id, content) VALUES (?, ?)', [postId, content]);
  }

  static async getCommentsByPostId(postId) {
    try {
      const [comments] = await pool.query('SELECT * FROM comments WHERE post_id = ?', [postId]);
      return comments;
    } catch (error) {
      throw new Error('Error fetching comments by post ID');
    }
  }
}

module.exports = Comment;
