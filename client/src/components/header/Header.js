import React from "react";
import { Navbar, Container, Offcanvas, Nav, Button } from "react-bootstrap";
import useGlobalContext from "../../hooks/useGlobalContext";
import axios from "axios";
import { server } from "../../context/AllContext";

const Header = () => {
  const { isLogged, setIsLogged } = useGlobalContext();

  const logoutHandler = async () => {
    try {
      await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });

      setIsLogged(false);

      window.location.href = "/";
    } catch (error) {
      setIsLogged(true);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar key="lg" expand="lg" className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="/">Blogs</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Blogs
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {isLogged ? (
                  <>
                    <Nav.Link href="/createBlog">Create Blog</Nav.Link>
                    <Button variant="outline-success" onClick={logoutHandler}>
                      LogOut
                    </Button>
                  </>
                ) : (
                  <Nav.Link href="/login">Login/Register</Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
