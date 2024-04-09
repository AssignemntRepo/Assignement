import React from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useParams } from "react-router-dom";
import "./SingleBlog.css";

const SingleBlog = () => {
  let { id } = useParams();

  const { blogs } = useGlobalContext();

  const singleblog = blogs.find((item) => item._id === id);

  return (
    <div className="singleBlog">
      <h2>{singleblog.title}</h2>
      <h5>Author: {singleblog.author}</h5>
      <p>{singleblog.content}</p>
    </div>
  );
};

export default SingleBlog;
