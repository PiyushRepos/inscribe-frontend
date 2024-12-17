import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RegisterFormSchema } from "../utils/formValidator";
import axios from "../axios/axios.js";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { AiOutlineLoading } from "react-icons/ai";
import useUserContext from "../context/userContext.jsx";

function Register() {
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  if (isAuthenticated()) {
    navigate("/");
  }

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });

  async function handleRegister(data) {
    try {
      const result = await axios.post("/api/auth/register", data, {
        withCredentials: true,
      });
      navigate("/auth/login");
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  }

  return (
    <div className="max-w-screen-sm mx-auto flex justify-center mt-28 px-2">
      <div className="border dark:border-[#272727] shadow-md dark:shadow-none rounded-md max-w-2xl w-full sm:w-[68%] py-4 px-6">
        <div>
          <h2 className="font-bold text-2xl dark:text-gray-200">
            Create an account
          </h2>
          <p className="font-medium text-xs sm:text-sm text-neutral-400 dark:text-gray-400">
            It only takes a minute to get started. Join us today!
          </p>
        </div>
        <div className="mt-5">
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="flex flex-col gap-3">
              <div className="grid sm:grid-cols-2 gap-2 items-center">
                <div className="flex flex-col gap-1">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    autoComplete="off"
                    {...register("firstName")}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    autoComplete="off"
                    {...register("lastName")}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="john.developer"
                  autoComplete="off"
                  {...register("username")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
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
                  Create account{" "}
                  {isSubmitting && (
                    <AiOutlineLoading className="text-lg animate-spin font-bold" />
                  )}
                </button>
              </div>
              <div>
                <p className="text-center text-sm text-neutral-500 font-medium dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-neutral-800 underline dark:text-gray-200"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
