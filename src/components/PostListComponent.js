import React from "react";

const PostListComponent = ({ posts, onSelectPost }) => {
  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => onSelectPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListComponent;
