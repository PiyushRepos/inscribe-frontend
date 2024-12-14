import { createContext, useContext } from "react";

export const UserContext = createContext({
  user: null,
  isAuthenticated: () => {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = UserContext.Provider;

export default function useUserContext() {
  return useContext(UserContext);
}
