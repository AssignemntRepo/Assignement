import React, { useEffect, useState } from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import axios from "axios";
import { server } from "../../context/AllContext";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const UpdateBlog = () => {
  let { id } = useParams();

  const { blogs } = useGlobalContext();

  const singleblog = blogs.find((item) => item._id === id);

  const [blogDetails, setBlogDetails] = useState({
    title: singleblog.title,
    author: singleblog.author,
    content: singleblog.content,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails({ ...blogDetails, [name]: value });
  };

  const onBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${server}/blog/${id}`,
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
      <h2>Update BLog</h2>
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default UpdateBlog;
