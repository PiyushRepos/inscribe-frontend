import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "../axios/axios.js";
import { toast } from "sonner";
import useUserContext from "../context/userContext";
import { IoMoon } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";

function Header() {
  const { logout, isAuthenticated } = useUserContext();
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  async function handleLogoutUser() {
    const result = await axios.post(
      "/api/auth/logout",
      {},
      { withCredentials: true }
    );
    logout();
    toast.success(result.data.message);
  }

  return (
    <div className="w-full bg-white z-[99] dark:bg-zinc-950 py-4 sticky top-0">
      <header className="max-w-screen-lg mx-auto px-2">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/">
              <h2 className="select-none text-xl sm:text-2xl font-bold dark:text-white/90">
                Inscribe
              </h2>
            </Link>
          </div>
          <nav className="relative flex items-center gap-4">
            {!isAuthenticated() && (
              <div className="flex items-center gap-4">
                <div>
                  <NavLink
                    to="/auth/login"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "font-semibold text-neutral-700 dark:text-neutral-400"
                          : "font-medium text-neutral-500"
                      } text-sm sm:text-base`
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
                          ? "font-semibold text-neutral-700 dark:text-neutral-400"
                          : "font-medium text-neutral-500"
                      } text-sm sm:text-base`
                    }
                  >
                    Register
                  </NavLink>
                </div>
              </div>
            )}
            <div className="mt-1">
              <button
                className="dark:text-neutral-400"
                onClick={() => setDarkMode(!darkMode)}
              >
                {!darkMode ? (
                  <IoMoon size={"1rem"} />
                ) : (
                  <LuSunMoon size={"1rem"} />
                )}
              </button>
            </div>
            {isAuthenticated() && (
              <div onClick={() => setShowMenu(!showMenu)}>
                <HiDotsVertical className="cursor-pointer select-none dark:text-white" />
                {showMenu && (
                  <div className="absolute flex flex-col bg-white dark:bg-zinc-800 shadow-sm top-8 right-1 border-2 dark:border-zinc-400 w-32 p-3 rounded-md z-30 gap-4">
                    <div>
                      <NavLink
                        to="/create"
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "font-semibold text-neutral-700 dark:text-neutral-400"
                              : "font-medium text-neutral-500"
                          } text-sm sm:text-base dark:text-neutral-300`
                        }
                      >
                        Create Post
                      </NavLink>
                    </div>
                    <div>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "font-semibold text-neutral-700 dark:text-neutral-400"
                              : "font-medium text-neutral-500"
                          } text-sm sm:text-base dark:text-neutral-300`
                        }
                      >
                        My Profile
                      </NavLink>
                    </div>
                    <div>
                      <NavLink
                        onClick={handleLogoutUser}
                        className="text-red-500 font-medium text-sm sm:text-base"
                      >
                        Logout
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
