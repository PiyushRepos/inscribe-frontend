import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import ResizeImage from "tiptap-extension-resize-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

import { toast } from "sonner";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaQuoteRight,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHighlighter,
  LuListOrdered,
} from "react-icons/lu";
import { AiOutlineFontColors } from "react-icons/ai";
import { IoImageOutline, IoSearch } from "react-icons/io5";
import { BiCodeBlock } from "react-icons/bi";
import { RiListUnordered } from "react-icons/ri";
import { VscHorizontalRule } from "react-icons/vsc";
import axios from "../axios/axios.js";
import useUserContext from "../context/UserContext.jsx";

// extensions
const extensions = [
  Underline.configure({
    HTMLAttributes: {
      class: "test",
    },
  }),
  Color,
  TextStyle,
  ResizeImage,
  ListItem.configure(),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    // alignments: "center",
  }),
  // TextStyle,
  // Color,
  // ImageResize,
  Image.configure({
    inline: true,
    HTMLAttributes: {
      class: "blog-image",
    },
  }),
  Dropcursor,
  Highlight.configure({ multicolor: true }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Placeholder.configure({
    placeholder: "Start typing your post here...",
  }),
];

function EditPost() {
  const { isAuthenticated } = useUserContext();
  const [localThumbnailUrl, setLocalThumbnailUrl] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState({
    highlighter: false,
    textColor: false,
  });
  const naviagte = useNavigate();

  if (!isAuthenticated) naviagte("/auth/login");

  const { postId } = useParams();

  const [postData, setPostData] = useState({
    title: "",
    summary: "",
    content: "",
    thumbnail: null,
  });

  const editor = useEditor({
    extensions,
    content: "",
  });

  useEffect(() => {
    axios.get(`/api/posts/${postId}`).then((res) => {
      let post = res.data.data.post;
      setPostData({
        ...postData,
        title: post.title,
        summary: post.summary,
        content: post.content,
        thumbnail: post.thumbnail,
      });
      editor.commands.setContent(post.content);
      setLocalThumbnailUrl(post.thumbnail);
    });
  }, [postId]);

  const addImage = (image) => {
    if (!image) return;
    toast.loading("Loading...", { id: "image" });
    let data = new FormData();
    data.append("image", image);
    axios
      .post("/api/posts/upload-image", data, { withCredentials: true })
      .then((res) => {
        editor.chain().focus().setImage({ src: res.data.url }).run();
        return toast.dismiss("image");
      })
      .catch((err) => {
        toast.dismiss("image");
        toast.error(err.message);
      });
  };

  const addImageByUrl = () => {
    const url = window.prompt("Enter a url");
    if (!url) return;

    editor.chain().focus().setImage({ src: url, alt: "blog-image" }).run();
  };

  if (!editor) {
    return null;
  }

  // Edit posts ----------------

  const textareaRef = useRef(null);
  function setTextareaHeight() {
    textareaRef.current.style.height = "auto";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = `${scrollHeight}px`;
  }

  const summaryTextareaRef = useRef(null);
  function setSummaryTextareaHeight() {
    summaryTextareaRef.current.style.height = "auto";
    const scrollHeight = summaryTextareaRef.current.scrollHeight;
    summaryTextareaRef.current.style.height = `${scrollHeight}px`;
  }

  async function handleUpdatePost() {
    if (!localThumbnailUrl) return toast.error("Thumbnal is required");
    if (!postData.title) return toast.error("Title is required");
    if (!postData.summary) return toast.error("Summary is required");
    if (editor.getText().length < 10)
      return toast.error("Minimum content length for creating a post is 10");

    toast.loading("Loading...", { id: "updatePosts" });
    const formData = new FormData();
    formData.append("thumbnail", postData.thumbnail);
    formData.append("title", postData.title);
    formData.append("summary", postData.summary);
    formData.append("content", editor.getHTML());

    await axios
      .put(`/api/posts/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.dismiss("updatePosts");
        toast.success(res.data.message);
        naviagte(`/post/${res.data.data.post._id}`);
      })
      .catch((err) => {
        err.response.data.error.errors?.map((err) => toast.error(err));
        toast.dismiss("updatePosts");
      });
  }

  return (
    <>
      <div className="max-w-screen-lg flex flex-col gap-y-2 mx-auto px-2 my-6">
        <div>
          <div className="flex gap-x-4 items-center justify-between">
            <div className="flex gap-x-4 items-center">
              <label
                htmlFor="thumbnail"
                className="inline-block cursor-pointer bg-neutral-200/45 px-4 py-3 rounded-full font-medium text-sm border border-black"
              >
                {!localThumbnailUrl
                  ? "Add a thumbnail image"
                  : "Change thumbnail"}
              </label>
              {localThumbnailUrl && (
                <button
                  className="text-sm text-red-500"
                  onClick={() => setLocalThumbnailUrl(null)}
                >
                  Remove thumbnail
                </button>
              )}
              <input
                onChange={(e) => {
                  setPostData({ ...postData, thumbnail: e.target.files[0] });
                  setLocalThumbnailUrl(URL.createObjectURL(e.target.files[0]));
                }}
                type="file"
                id="thumbnail"
                className="hidden"
              />
            </div>
            <div>
              <button onClick={handleUpdatePost} className="btn-primary">
                Update
              </button>
            </div>
          </div>
          {localThumbnailUrl && (
            <div className="my-2">
              <img
                className="aspect-video shadow-lg w-56 object-cover max-h-96"
                src={`${localThumbnailUrl}`}
                alt="blog thumbnail"
              />
            </div>
          )}
        </div>
        <div>
          <textarea
            ref={textareaRef}
            className="w-full bg-transparent dark:text-white overflow-hidden border text-4xl font-bold rounded resize-none p-2 focus-visible:outline-none"
            name=""
            placeholder="Enter you title"
            onKeyDown={setTextareaHeight}
            rows={1}
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></textarea>
          <textarea
            ref={summaryTextareaRef}
            className="w-full bg-transparent dark:text-white overflow-hidden border text-sm md:text-lg rounded resize-none p-2 focus-visible:outline-none"
            name=""
            placeholder="Write summary for your blog post"
            onKeyDown={setSummaryTextareaHeight}
            rows={2}
            value={postData.summary}
            onChange={(e) =>
              setPostData({ ...postData, summary: e.target.value })
            }
          ></textarea>
        </div>

        <div className="my-5">
          <div className="tiptap-toolbar border rounded-t-lg p-3 flex gap-4 flex-wrap items-center text-lg">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={
                editor.isActive("bold") ? "is-active" : "dark:text-white"
              }
            >
              <FaBold size={"1em"} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={
                editor.isActive("italic") ? "is-active" : "dark:text-white"
              }
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              className={
                editor.isActive("underline") ? "is-active" : "dark:text-white"
              }
            >
              <FaUnderline />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={
                editor.isActive("strike") ? "is-active" : "dark:text-white"
              }
            >
              <FaStrikethrough />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={
                editor.isActive("orderedList") ? "is-active" : "dark:text-white"
              }
            >
              <LuListOrdered size={"1.4em"} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={
                editor.isActive("bulletList") ? "is-active" : "dark:text-white"
              }
            >
              <RiListUnordered size={"1.4em"} />
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className={
                editor.isActive("horizontalRule")
                  ? "is-active"
                  : "dark:text-white"
              }
            >
              <VscHorizontalRule size={"1.6em"} />
            </button>
            <button className="relative">
              <LuHighlighter
                className="cursor-pointer dark:text-white"
                onClick={() =>
                  setShowColorPicker({
                    ...showColorPicker,
                    highlighter: !showColorPicker.highlighter,
                  })
                }
              />
              <input
                type="color"
                className={`${
                  !showColorPicker.highlighter ? "hidden" : ""
                } absolute -top-2 -left-2 w-9 opacity-0 cursor-pointer z-10 shadow px-2 py-4`}
                onInput={(e) => {
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: e.target.value })
                    .run();
                }}
              />
            </button>
            <button className="relative">
              <AiOutlineFontColors
                size={"1.1em"}
                className="cursor-pointer dark:text-white"
                onClick={() =>
                  setShowColorPicker({
                    ...showColorPicker,
                    textColor: !showColorPicker.textColor,
                  })
                }
              />
              <input
                type="color"
                className={`${
                  !showColorPicker.textColor ? "hidden" : ""
                } absolute -top-2 -left-2 w-9 opacity-0 cursor-pointer z-10 shadow px-2 py-4`}
                onInput={(e) =>
                  editor.chain().focus().setColor(e.target.value).run()
                }
              />
            </button>
            <button>
              <LuHeading1
                size={"1.45em"}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 })
                    ? "is-active"
                    : "dark:text-white"
                }
              />
            </button>
            <button>
              <LuHeading2
                size={"1.45em"}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 })
                    ? "is-active"
                    : "dark:text-white"
                }
              />
            </button>
            <button>
              <LuHeading3
                size={"1.45em"}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 })
                    ? "is-active"
                    : "dark:text-white"
                }
              />
            </button>
            <button>
              <LuHeading4
                size={"1.45em"}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                  editor.isActive("heading", { level: 4 })
                    ? "is-active"
                    : "dark:text-white"
                }
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={
                editor.isActive("blockquote") ? "is-active" : "dark:text-white"
              }
            >
              <FaQuoteRight />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={
                editor.isActive("codeBlock") ? "is-active" : "dark:text-white"
              }
            >
              <BiCodeBlock />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" })
                  ? "is-active"
                  : "dark:text-white"
              }
            >
              <FaAlignLeft />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" })
                  ? "is-active"
                  : "dark:text-white"
              }
            >
              <FaAlignCenter />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" })
                  ? "is-active"
                  : "dark:text-white"
              }
            >
              <FaAlignRight />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={
                editor.isActive({ textAlign: "justify" })
                  ? "is-active"
                  : "dark:text-white"
              }
            >
              <FaAlignJustify />
            </button>
            <div className="group relative">
              <IoImageOutline size={"1.5em"} className="dark:text-white" />
              <div className="absolute left-0 top-6 z-10 w-48">
                <div className="cursor-pointer px-3 py-4 bg-white shadow-lg border hidden group-hover:flex group-hover:flex-col group-hover:gap-y-4 group-hover:group">
                  <div className="flex items-center gap-x-3">
                    <FiUpload className="text-sm sm:text-base" />
                    <label className="cursor-pointer relative overflow-hidden w-full text-sm sm:text-base font-semibold dark:text-black">
                      Upload
                      <input
                        className="absolute -left-0 opacity-0"
                        type="file"
                        onChange={(e) => addImage(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div
                    onClick={addImageByUrl}
                    className="cursor-pointer flex items-center gap-x-3 hover:bg-white/95"
                  >
                    <IoSearch />
                    <p className="text-sm sm:text-base font-semibold">
                      Paste image URL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <EditorContent
              onChange={(e) => {
                setPostData({ ...postData, content: editor.getHTML() });
              }}
              editor={editor}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPost;
