import React from "react";

const PostDetailComponent = ({ selectedPost }) => {
  return (
    <div>
      <h2>Post Details</h2>
      {selectedPost ? (
        <div>
          <h3>{selectedPost.title}</h3>
          <p>{selectedPost.content}</p>
        </div>
      ) : (
        <p>Select a post to view details.</p>
      )}
    </div>
  );
};

export default PostDetailComponent;
