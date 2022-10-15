const newCommentHandler = async (event) => {
  event.preventDefault();
  const post_id = event.target.getAttribute('data-comment');

  const comment = document.querySelector('#comment-content').value.trim();
console.log(comment)
 
  const response = await fetch(`/comments/${post_id}`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add comment');
    }
};

document
.querySelector('#comment-btn')
.addEventListener('click', newCommentHandler);