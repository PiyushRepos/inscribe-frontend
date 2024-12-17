import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios/axios.js";

// Create UserContext
export const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  const value = {
    user,
    isAuthenticated: !!user,
    login: (userData) => setUser(userData),
    logout: () => setUser(null),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom Hook to use UserContext
export default function useUserContext() {
  return useContext(UserContext);
}
