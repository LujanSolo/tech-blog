const commentBtn = document.querySelector('#add-comment');

const postID = parseInt(window.location.href[window.location.href.length -1]);

const handleCommentCreate = async(event) => {
  event.preventDefault();

  const comment = document.querySelector('textarea[name="comment"]').value;
  console.log(comment)
  if (comment) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ 'comment': comment, 'post_id': postID }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace(`/comments/${postID}`);
    } else {
      alert('Failed to add comment');
    }
  }
}

commentBtn.addEventListener('click', handleCommentCreate);