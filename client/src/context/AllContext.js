import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();
export const server = "http://localhost:4000/api/v1";

const AllContext = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${server}/user/infor`, {
          withCredentials: true,
        })
        .then((res) => {
          setUserDetail(res.data.user);
          setIsLogged(true);
        })
        .catch((error) => {
          setUserDetail({});
          setIsLogged(false);
          localStorage.removeItem("token");
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${server}/blog/blogs`, {
        withCredentials: true,
      })
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((error) => {
        setBlogs([]);
        console.log(error);
      });
  }, []);

  const values = {
    isLogged,
    setIsLogged,
    userDetail,
    blogs,
  };
  return (
    <>
      <AppContext.Provider value={values}>{children}</AppContext.Provider>
    </>
  );
};

export default AllContext;
