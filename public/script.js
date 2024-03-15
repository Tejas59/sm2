document.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    if (event.target.id === 'create-post-form') {
      const form = event.target;
      const imageUrl = form.querySelector('#imageUrl').value;
      const description = form.querySelector('#description').value;
  
      try {
        const response = await fetch('/create-post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl, description })
        });
  
        if (response.ok) {
          // Refresh the posts after creating a new one
          fetchPosts();
          
          // Clear form fields
          form.querySelector('#imageUrl').value = '';
          form.querySelector('#description').value = '';
        } else {
          console.error('Error creating post');
          alert('Failed to create post. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting post:', error);
        // Handle submission error (e.g., display error message)
      }
    }
  });
  
  // Fetch initial posts when the page loads
  document.addEventListener('DOMContentLoaded', async () => {
    fetchPosts();
  });
  
  // Fetch all posts from the server
  async function fetchPosts() {
    try {
      const response = await fetch('/');
      const data = await response.json();
  
      // Clear the posts container
      const postsContainer = document.getElementById('posts-container');
      postsContainer.innerHTML = '';
  
      // Add each post to the UI
      data.posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle fetching error (e.g., display error message)
    }
  }
  
  // Function to create a post element
  function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
  
    // Add post content
    postElement.innerHTML = `
      <h3>Anonymous</h3>
      <img src="${post.imageUrl}" alt="Post image">
      <p>${post.description}</p>
      <h4>Comments:</h4>
      <ul class="comments" data-post-id="${post.id}"></ul>
      <div class="comment-section">
        <form class="comment-form" data-post-id="${post.id}">
          <label for="comment">Add a comment:</label>
          <input type="text" name="comment" required>
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    `;
  
    return postElement;
  }
  