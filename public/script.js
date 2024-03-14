async function submitComment(event) {
    event.preventDefault();
    const form = event.target;
    const postId = form.dataset.postId;
    const commentContent = form.querySelector('#comment').value;
  
    try {
      const response = await fetch(`/create-comment/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentContent })
      });
  
      if (response.ok) {
        form.querySelector('#comment').value = ''; // Clear comment input
        // Update comments on the page (optional, needs DOM manipulation)
        // You can use techniques like fetching updated comments or directly adding the new comment to the UI
      } else {
        console.error('Error creating comment');
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message)
    }
  }
  
  const commentForms = document.querySelectorAll('.comment-form');
  commentForms.forEach(form => {
    form.addEventListener('submit', submitComment);
  });
  