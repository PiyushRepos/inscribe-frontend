import React, { useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import ResizeImage from "tiptap-extension-resize-image";
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
  LuListOrdered,
} from "react-icons/lu";
import { IoImageOutline, IoSearch } from "react-icons/io5";
import { BiCodeBlock } from "react-icons/bi";
import { RiListUnordered } from "react-icons/ri";
import { VscHorizontalRule } from "react-icons/vsc";
import axios from "../axios/axios.js";
import { useEffect } from "react";

const extensions = [
  Underline.configure({
    HTMLAttributes: {
      class: "test",
    },
  }),
  ResizeImage,
  ListItem.configure(),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    // alignments: "center",
  }),
  // ImageResize,
  Image.configure({
    inline: true,
    HTMLAttributes: {
      class: "blog-image",
    },
  }),
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

function Editor() {
  const [content, setcontent] = useState(
    JSON.parse(localStorage.getItem("editorContent")) || null
  );

  const editor = useEditor({
    extensions,
    content,
  });

  useEffect(() => {
    localStorage.setItem("editorContent", JSON.stringify(editor.getHTML()));
    setcontent(localStorage.getItem("editorContent"));
  }, [editor.getHTML()]);

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

  return (
    <div className="my-5 max-h-screen">
      <div className="tiptap-toolbar border rounded-t-lg p-3 flex gap-4 flex-wrap items-center text-lg">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : "dark:text-white"}
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
            editor.isActive("horizontalRule") ? "is-active" : "dark:text-white"
          }
        >
          <VscHorizontalRule size={"1.6em"} />
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
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
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
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
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
                <label className="cursor-pointer relative overflow-hidden w-full text-sm sm:text-base font-semibold">
                  Upload
                  <input
                    className="absolute left-0 opacity-0"
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
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default Editor;
