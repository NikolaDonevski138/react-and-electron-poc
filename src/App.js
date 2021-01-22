import React, { useState } from "react";
import uuid from "react-uuid";
import "./style.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [blogPost, setBlogPost] = useState("");
  const [resp, setResp] = useState();
  const [err, setError] = useState();

  let createPost = () => {
    if (!title && !blogPost) {
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: blogPost,
        userId: uuid(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setResp(resp))
      .catch((e) => setError("Error Occured"));
  };

  return (
    <div class="container">
      <div class="form">
        <div class="headings">
          <h1>Testing React with Electron</h1>
          <h2>Write some blog post!</h2>
        </div>
        <div class="title_input_container">
          <p>Title of blog post</p>
          <input
            className="title_blog_post"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="blog_container">
          <p>Write your blog</p>
          <textarea
            className="blog"
            value={blogPost}
            onChange={(e) => setBlogPost(e.target.value)}
            rows={4}
            columns={4}
          />
        </div>
        <div className="submit_button_container">
          <button className="submit_button" onClick={createPost}>
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
