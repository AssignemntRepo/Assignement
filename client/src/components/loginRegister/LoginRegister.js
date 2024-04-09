import React, { useState } from "react";
import axios from "axios";
import useGlobalContext from "../../hooks/useGlobalContext";
import { server } from "../../context/AllContext";
import { Button } from "react-bootstrap";
import "./LoginRegister.css";

const LoginRegister = () => {
  // const context = useContext(AppContext);

  // const [] = context.isLogged;
  const { setIsLogged } = useGlobalContext();

  const [Login, setLogin] = useState(true);

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const onLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const loginOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/user/login`,
        {
          ...loginUser,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setIsLogged(true);
      localStorage.setItem("token", true);
      alert(res.data.message);
      setLoginUser({
        email: "",
        password: "",
      });

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  // register

  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/user/register`,
        {
          ...user,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert(data.message);
      setUser({
        email: "",
        name: "",
        password: "",
      });
      setIsLogged(true);
      localStorage.setItem("token", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="loginRegister">
        {Login ? (
          <>
            <h2>Login</h2>
            <form onSubmit={loginOnSubmit}>
              <input
                type="email"
                name="email"
                placeholder="test@gmail.com"
                value={loginUser.email}
                required
                onChange={onLoginChange}
              />

              <br />
              <br />
              <input
                type="password"
                name="password"
                placeholder="********"
                value={loginUser.password}
                required
                onChange={onLoginChange}
              />

              <br />
              <br />

              <Button type="submit">Login</Button>
              <br />
              <br />
              <p
                style={{ cursor: "pointer ", color: "blue" }}
                onClick={() => setLogin(!Login)}
              >
                Don't have an account?
                <br /> Register Now!
              </p>
            </form>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={user.name}
                required
                onChange={onChange}
              />

              <br />
              <br />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={user.email}
                required
                onChange={onChange}
              />

              <br />
              <br />

              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={user.password}
                required
                onChange={onChange}
              />

              <br />
              <br />

              <Button type="submit">Sign Up</Button>
              <br />
              <br />
              <p
                style={{ cursor: "pointer ", color: "blue" }}
                onClick={() => setLogin(!Login)}
              >
                Already Have An Account?
              </p>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default LoginRegister;
