import React from "react";
import useUserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, isAuthenticated } = useUserContext();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    return navigate("/auth/login");
  }

  return (
    <main className="max-w-screen-md mx-auto px-2">
      Full name : {user?.fullName}
    </main>
  );
}

export default Profile;
