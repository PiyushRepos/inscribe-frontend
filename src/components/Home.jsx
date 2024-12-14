import dayjs from "dayjs";
import axios from "../axios/axios.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import CardSkeleton from "./CardSkeleton.jsx";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/posts")
      .then((res) => {
        const sortedPosts = res.data.data.posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="max-w-screen-lg mx-auto px-2">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-9">
          <CardSkeleton count={8} />
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6 py-4">
          {posts?.map((post) => (
            <Link to={`/post/${post._id}`} key={post.slug}>
              <div>
                <div>
                  <img
                    className="rounded-md w-full object-cover border-2 min-h-52"
                    loading="lazy"
                    src={
                      post.thumbnail ||
                      "https://placehold.co/300x250/?text=Thumbnail"
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
                    By{" "}
                    <span className="text-zinc-500 font-medium capitalize">
                      {post.author.username}
                    </span>
                  </p>
                  <p className="text-sm mt-1 text-neutral-500">
                    {dayjs(post.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-300">
            No Posts Yet!
          </h2>
          <p className="sm:max-w-md text-gray-500 mt-2 dark:text-gray-400">
            It looks like there are no posts at the moment. There could be
            something wrong while getting posts.
          </p>
          <button className="btn-primary mt-4">
            <Link to="/create">Create Post</Link>
          </button>
        </div>
      )}
    </main>
  );
}
export default Home;
