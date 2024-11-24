import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import useUserContext from "../context/userContext";

function Header() {
  const { logout, isAuthenticated } = useUserContext();

  async function handleLogoutUser() {
    const result = await axios.post(
      "http://localhost:5001/api/auth/logout",
      {},
      { withCredentials: true }
    );
    logout();
    toast.success(result.data.message);
  }

  return (
    <header className="max-w-screen-md mx-auto px-2 mt-3">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold">Inscribe</h2>
          </Link>
        </div>
        <nav>
          {!isAuthenticated() && (
            <div className="flex items-center gap-4">
              <div>
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "font-semibold text-neutral-700"
                        : "font-medium text-neutral-500"
                    }`
                  }
                >
                  Login
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/auth/register"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "font-semibold text-neutral-700"
                        : "font-medium text-neutral-500"
                    }`
                  }
                >
                  Register
                </NavLink>
              </div>
            </div>
          )}
          {isAuthenticated() && (
            <div className="flex items-center gap-4">
              <div>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "font-semibold text-neutral-700"
                        : "font-medium text-neutral-500"
                    }`
                  }
                >
                  My Profile
                </NavLink>
              </div>
              <div>
                <NavLink
                  onClick={handleLogoutUser}
                  className="text-red-500 font-medium"
                >
                  Logout
                </NavLink>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
