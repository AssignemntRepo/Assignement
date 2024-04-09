import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import LoginRegister from "./components/loginRegister/LoginRegister";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/homePage/HomePage";
import useGlobalContext from "./hooks/useGlobalContext";
import CreateBlog from "./components/createBlog/CreateBlog";
import UpdateBlog from "./components/updateBlog/UpdateBlog";
import SingleBlog from "./components/singleBlog/SingleBlog";

function App() {
  const { isLogged } = useGlobalContext();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/login" element={<LoginRegister />} />

        <Route
          path="/createBlog"
          element={isLogged ? <CreateBlog /> : <LoginRegister />}
        />
        <Route
          path="/updateBlog/:id"
          element={isLogged ? <UpdateBlog /> : <LoginRegister />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
