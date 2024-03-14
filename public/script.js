document.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    // Check if the submitted form is a comment form
    if (event.target.classList.contains('comment-form')) {
      const form = event.target;
      const postId = form.dataset.postId;
      
      // Find the comment content within the submitted form
      const commentContent = form.querySelector('input[name="comment"]').value;
  
      try {
        const response = await fetch(`/create-comment/${postId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: commentContent })
        });
  
        if (response.ok) {
          // Clear comment input and refetch comments for updated display
          form.querySelector('input[name="comment"]').value = '';
          fetchComments(postId);
        } else {
          console.error('Error creating comment');
          alert('Failed to add comment. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
        // Handle submission error (e.g., display error message)
      }
    }
  });
  