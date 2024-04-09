import React, { useState } from "react";
import axios from "axios";
import { server } from "../../context/AllContext";
import { Button } from "react-bootstrap";
import "./CreateBlog.css";

const CreateBlog = () => {
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    author: "",
    content: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails({ ...blogDetails, [name]: value });
  };

  const onBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/blog/newblog`,
        {
          ...blogDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert(res.data.message);
      setBlogDetails({
        title: "",
        author: "",
        content: "",
      });

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="createBlog">
      <h2>Create New BLog</h2>
      <form onSubmit={onBlogSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter your Blog Title"
          value={blogDetails.title}
          required
          onChange={onInputChange}
        />

        <br />
        <br />
        <input
          type="text"
          name="author"
          placeholder="Enter Author Name"
          value={blogDetails.author}
          required
          onChange={onInputChange}
        />
        <br />
        <br />
        <textarea
          name="content"
          placeholder="Enter your Blog's Content"
          value={blogDetails.content}
          required
          onChange={onInputChange}
        />

        <br />
        <br />
        <Button type="submit" className="z-btn ">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
