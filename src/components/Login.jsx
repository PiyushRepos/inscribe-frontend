import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoginFormSchema } from "../utils/formValidator";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "../axios/axios.js";
import useUserContext from "../context/userContext.jsx";

function Login() {
  const { login, isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return navigate("/");
  }

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  useEffect(() => {
    if (errors) {
      for (let [key, value] of Object.entries(errors)) {
        toast.error(value.message);
      }
    }
  }, [errors]);
  async function handleLogin(data) {
    try {
      await axios
        .post("/api/auth/login", data, {
          withCredentials: true,
        })
        .then(({ data: { data } }) => {
          login(data.user);
          navigate("/");
          toast.success("Welcome " + data.user.firstName);
        })
        .catch(
          ({
            response: {
              data: { error },
            },
          }) => {
            toast.error(error.message);
          }
        );
    } catch (error) {
      toast.error("Something went wrong. Pease try after some time.");
    }
  }

  return (
    <div className="max-w-screen-sm mx-auto flex justify-center mt-32 px-2">
      <div className="border dark:border-[#393939] shadow-md rounded-md max-w-2xl w-full sm:w-[68%] py-4 px-6">
        <div>
          <h2 className="font-bold text-2xl dark:text-gray-200">
            Welcome back
          </h2>
          <p className="w-5/6 font-medium text-xs sm:text-sm text-neutral-400 leading-snug dark:text-gray-400">
            We missed you! Enter your details to pick up right where you left
            off.
          </p>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  autoComplete="off"
                  {...register("email")}
                />
              </div>
              <div className="relative flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input
                  type={!showPassword ? "password" : "text"}
                  id="password"
                  autoComplete="off"
                  {...register("password")}
                />
                {!showPassword ? (
                  <HiOutlineEyeOff
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-9 text-xl"
                  />
                ) : (
                  <HiOutlineEye
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-9 text-xl"
                  />
                )}
              </div>
              <div>
                <button
                  className="btn-primary mt-1 w-full flex items-center justify-center gap-4"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                  {isSubmitting && (
                    <AiOutlineLoading className="text-lg animate-spin font-bold" />
                  )}
                </button>
              </div>
              <div>
                <p className="text-center text-sm text-neutral-500 font-medium dark:text-gray-300">
                  No account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-neutral-800 underline dark:text-gray-200"
                  >
                    Create an account
                  </Link>
                  &nbsp; and get started!
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
