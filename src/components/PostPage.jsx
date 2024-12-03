import axios from "../axios/axios.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import ReactHtmlParser from "react-html-parser";

function PostPage() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  console.log(postId);
  useEffect(() => {
    axios
      .get(`/api/posts/${postId}`)
      .then((res) => {
        setPost(res.data.data.post);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        err.response.data.error.errors?.map((err) => toast.error(err));
      });
  }, [postId]);

  return post ? (
    <div className="max-w-screen-md mx-auto px-2">
      <div>
        <h1 className="text-2xl md:text-3xl dark:text-gray-200 font-extrabold py-5 sm:mt-6">
          {post && post.title}
        </h1>
        <div className="rounded overflow-hidden">
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
          Published {dayjs(post?.createdAt).fromNow()}
        </p>
      </div>
      <div className="border my-5"></div>
      <div>
        <p className="dark:text-zinc-50">{post.summary}</p>
      </div>
      <div className="my-8">
        <div className="tiptap border-none">
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
