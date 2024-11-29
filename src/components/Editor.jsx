import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
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
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuListOrdered,
} from "react-icons/lu";
import { BiCodeBlock } from "react-icons/bi";
import { RiListUnordered } from "react-icons/ri";
import { VscHorizontalRule } from "react-icons/vsc";

// define your extension array
const extensions = [
  Underline.configure({}),
  ListItem.configure(),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    // alignments: "center",
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Placeholder.configure({
    placeholder: "Start typing your post here...",
  }),
];

function Editor() {
  const editor = useEditor({
    extensions,
    content: "",
  });
  return (
    <div className="my-5 h-screen">
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
      </div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default Editor;
