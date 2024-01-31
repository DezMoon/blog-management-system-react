import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import PostListComponent from "./components/PostListComponent";
import PostDetailComponent from "./components/PostDetailComponent";
import RegistrationForm from "./components/RegistrationForm";
import client from "./graphql";

// Define GraphQL queries and mutations
const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;

const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  // Use the useQuery hook to fetch posts with the imported client
  const { loading, error, data } = useQuery(GET_POSTS, { client });

  // Use the useMutation hook to add a new post with the imported client
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    client,
  });

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  const handleAddPost = () => {
    // Call the mutation function
    addPost({
      variables: { title: "New Post", content: "This is a new post." },
    });
  };

  return (
    <div>
      <button onClick={handleAddPost}>Add Post</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <PostListComponent
        posts={data?.posts || []}
        onSelectPost={handleSelectPost}
      />
      <PostDetailComponent selectedPost={selectedPost} />
      <RegistrationForm />
    </div>
  );
};

export default App;
