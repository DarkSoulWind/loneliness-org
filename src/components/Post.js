import React from 'react';

const Post = ({ post }) => {
    return (
      <div>
        <h3>{post.title}</h3>
        <h4>{post.description}</h4>
        {post.image && <img src={post.image} />}
        <h4>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</h4>
        <h5>{post.displayname} at {post.date.toDate().toDateString()} {post.date.toDate().toLocaleTimeString()}</h5>
      </div>
    )
  }

export default Post;
