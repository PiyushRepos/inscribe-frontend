import React from "react";
import useUserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function Profile() {
  const { user, isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return navigate("/auth/login");
  }

  dayjs.extend(relativeTime);

  return (
    <main className="max-w-screen-lg mx-auto px-2 max-h-screen">
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
            <p className="text-neutral-600 dark:text-gray-400">{`Joined ${dayjs(
              user?.createdAt
            ).format("MMM DD, YYYY")}`}</p>
          </div>
        </div>
        <div className="my-4 relative">
          <h2 className="text-left font-semibold text-lg border-b-2 pb-2 my-3 dark:text-gray-100">
            Your posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center items-start">
            {/* post card start */}
            {!(user.posts.length < 0) &&
              user.posts
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post) => (
                  <Link to={`/post/${post._id}`} key={post.slug}>
                    <div>
                      <div>
                        <img
                          className="rounded-md w-full object-cover border h-full"
                          loading="lazy"
                          src={
                            post.thumbnail ||
                            "https://placehold.co/300x166/?text=Thumbnail"
                          }
                          alt="thumbnail image"
                        />
                      </div>
                      <div className="mt-1">
                        <h2 className="text-xl line-clamp-2 md:text-2xl font-bold md:font-extrabold leading-tight dark:text-gray-300">
                          {post.title}
                        </h2>
                        <p
                          className={`line-clamp-3 text-sm md:text-base py-1 text-neutral-600 md:text-neutral-500 font-medium dark:text-gray-400`}
                        >
                          {post.summary}
                        </p>
                        <p className="text-sm mt-1 text-neutral-500">
                          Published {dayjs(post.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            {/* post card end */}
            {user.posts.length <= 0 && (
              <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 h-full translate-y-[200%] w-full">
                <h2 className="text-gray-500 text-center mt-2 dark:text-gray-400">
                  It looks like you have not created any posts yet !
                </h2>
                <button className="btn-primary my-4">
                  <Link to="/create">Create a Post</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
