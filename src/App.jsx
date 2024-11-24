import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import CreatePost from "./components/CreatePost.jsx";
import axios from "axios";
import { UserProvider } from "./context/userContext.js";
import Profile from "./components/Profile.jsx";

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
        .get("http://localhost:5001/api/users/profile", {
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
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
