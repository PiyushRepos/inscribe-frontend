import axios from "../axios/axios.js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import ReactHtmlParser from "react-html-parser";
import PostPageSkeleton from "./PostPageSkeleton.jsx";
import { HiDotsVertical } from "react-icons/hi";
import useUserContext from "../context/UserContext.jsx";

function PostPage() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { postId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/posts/${postId}`, {})
      .then((res) => {
        setPost(res.data.data.post);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        err.response.data.error.errors?.map((err) => toast.error(err));
        setIsLoading(false);
      });
  }, [postId]);

  const deletePost = () => {
    toast.loading("Deleting post...", { id: "deletePost" });
    axios
      .delete(`/api/posts/${postId}`, {})
      .then(({ data }) => {
        console.log(data);
        toast.dismiss("deletePost");
        toast.success("Post deleted successfully");
        navigate("/");
      })
      .catch(
        ({
          response: {
            data: { error },
          },
        }) => {
          console.log(error);
          toast.error(error.message);
          toast.dismiss("deletePost");
        }
      );
  };

  return isLoading ? (
    <PostPageSkeleton />
  ) : post ? (
    <div className="max-w-screen-md mx-auto px-2">
      <div>
        <div className="flex justify-between items-center sm:mt-6">
          <h1 className="text-2xl md:text-3xl dark:text-gray-200 font-extrabold py-4">
            {post.title}
          </h1>
          {user?._id === post?.author._id && (
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative cursor-pointer flex justify-center items-center"
            >
              <HiDotsVertical
                className="dark:text-zinc-400 select-none text-zinc-500"
                size={20}
              />
              {isMenuOpen && (
                <div className="flex flex-col gap-y-2 absolute top-10 right-0 bg-white dark:bg-zinc-700 border-2 dark:border-zinc-400 p-3 rounded-md shadow-md">
                  <Link
                    className="text-sm text-zinc-500 dark:text-zinc-400"
                    to={`/post/${post._id}/edit`}
                  >
                    Edit
                  </Link>
                  <Link
                    onClick={deletePost}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="rounded overflow-hidden border border-slate-200">
          <img
            className="aspect-video w-full"
            src={
              post.thumbnail || "https://placehold.co/900x500/?text=Thumbnail"
            }
            alt="post thumbnail"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between gap-3 my-2">
        <p className="text-sm sm:text-base font-medium dark:text-zinc-400">
          Published by{" "}
          <span className="italic font-semibold underline">
            @{post.author.firstName}
          </span>
        </p>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
          {dayjs(post?.createdAt).format("MMM D, YYYY")}
        </p>
      </div>
      <div className="border my-5"></div>
      <div className="my-8">
        <div className="tiptap border-none max-w-screen-md text-wrap leading-7">
          {ReactHtmlParser(post.content)}
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-screen-lg mx-auto px-2 grid place-content-center h-[90vh]">
      <h2 className="font-medium text-neutral-400">
        No post found with id {postId}
      </h2>
    </div>
  );
}

export default PostPage;
