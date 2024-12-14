import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import axios from "./axios/axios.js";
import { UserProvider } from "./context/userContext.js";
import Profile from "./components/Profile.jsx";
import NotFound from "./components/NotFound.jsx";
import PostPage from "./components/PostPage.jsx";
import CreatePost from "./components/CreatePost.jsx";
import EditPost from "./components/EditPost.jsx";

function App() {
  const [user, setUser] = useState(null);

  const isAuthenticated = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      axios
        .get("/api/users/profile", {
          withCredentials: true,
        })
        .then((result) => {
          setUser(result.data.data);
        })
        .catch((err) => console.log(err.message));
    }
  }, []);
  return (
    <UserProvider value={{ user, logout, login, isAuthenticated }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/post/:postId/edit" element={<EditPost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
