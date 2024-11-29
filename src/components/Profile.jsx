import React from "react";
import useUserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function Profile() {
  const { user, isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    return navigate("/auth/login");
  }

  dayjs.extend(relativeTime);

  return (
    <main className="max-w-screen-md mx-auto px-2 h-screen">
      <div className="flex flex-col justify-center mt-14">
        <div className="flex justify-center flex-col items-center gap-5">
          <div className="w-12 h-12">
            <img
              className="w-full h-full"
              src={user?.profileImage || "./default-profile-img.png"}
              alt="user profile image"
            />
          </div>
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-base text-center font-semibold dark:text-gray-300">
              {user?.fullName}
            </h2>
            <p className="text-neutral-600 font-semibold dark:text-gray-300">
              {user?.bio || "Full Stack Web Developer"}
            </p>
            <p className="text-neutral-600 dark:text-gray-400">{`joined ${dayjs(
              user?.createdAt
            ).fromNow()}`}</p>
          </div>
        </div>
        <div className="my-4">
          <h2 className="text-left font-semibold text-lg border-b-2 pb-2 my-3 dark:text-gray-100">
            Your posts
          </h2>
          {/* {!user?.posts?.length > 0 && (
            <div className="relative">
              <div className="text-center pt-7 text-neutral-400">
                <p>No post yet</p>
              </div>
            </div>
          )} */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* post card start */}
            <div>
              <div>
                <img
                  className="rounded-md w-full object-cover"
                  src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*aA4F9nXBWs7aLvR1lqKMbQ.jpeg"
                  alt="thumbnail image"
                />
              </div>
              <div className="mt-1">
                <h2 className="text-xl md:text-2xl font-bold md:font-extrabold leading-tight dark:text-gray-300">
                  How I Study Consistently With A Full-Time Job
                </h2>
                <p className="text-sm md:text-base py-1 text-neutral-600 md:text-neutral-500 font-medium dark:text-gray-400">
                  Don’t Rely on Motivation. Try This Instead.
                </p>
                <p className="text-neutral-400 mt-1 text-xs sm:text-sm dark:text-gray-300">
                  By @{user.firstName}
                </p>
                <p className="text-sm mt-1 text-neutral-500">
                  Published {dayjs(new Date("10-10-2024")).fromNow()}
                </p>
              </div>
            </div>
            {/* post card end */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
