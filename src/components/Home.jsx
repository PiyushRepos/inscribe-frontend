import dayjs from "dayjs";
import axios from "../axios/axios.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        const sortedPosts = res.data.data.posts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
        console.log(res.data.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="max-w-screen-lg mx-auto px-2">
      {posts.length <= 0 ? (
        <div className="flex flex-col items-center justify-center h-[90vh] text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-300">
            No Posts Yet!
          </h2>
          <p className="text-gray-500 mt-2 dark:text-gray-400">
            It looks like there are no posts at the moment.
          </p>
          <button className="btn-primary my-4">
            <Link to="/create">Create a Post</Link>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-9">
          {posts?.map((post) => (
            <Link to={`/post/${post._id}`} key={post.slug}>
              <div>
                <div>
                  <img
                    className="rounded-md w-full object-cover border-2 max-h-52"
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
                    By &nbsp;
                    <span className="text-zinc-600 font-medium underline italic">
                      {post.author.username}
                    </span>
                  </p>
                  <p className="text-sm mt-1 text-neutral-500">
                    Published {dayjs(post.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
