import { createContext, useContext } from "react";
import { CgExport } from "react-icons/cg";

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
