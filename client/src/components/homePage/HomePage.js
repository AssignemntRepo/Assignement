import React from "react";
import useGlobalContext from "../../hooks/useGlobalContext";
import axios from "axios";
import { server } from "../../context/AllContext";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./HomePage.css";

const HomePage = () => {
  const { blogs, isLogged } = useGlobalContext();

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${server}/blog/${id}`, {
        withCredentials: true,
      });

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="homePage">
      {blogs.map((item) => (
        <Link
          key={item._id}
          to={`/blog/${item._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card>
            <Card.Header>{item.title}</Card.Header>

            <Card.Body>
              <Card.Title>{item.author}</Card.Title>
              <Card.Text>{item.content.slice(0, 50)} ...</Card.Text>

              {isLogged ? (
                <>
                  <Button
                    onClick={() => deleteBlog(item._id)}
                    variant="primary"
                  >
                    Delete
                  </Button>
                  <Card.Link href={`/updateBlog/${item._id}`}>
                    <Button variant="primary">Update</Button>
                  </Card.Link>
                </>
              ) : (
                <></>
              )}
            </Card.Body>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
