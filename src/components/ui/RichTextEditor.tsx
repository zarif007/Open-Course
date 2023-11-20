"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toggle } from "./Toggle";
import {
  BiBold,
  BiCodeAlt,
  BiHeading,
  BiItalic,
  BiLinkAlt,
  BiParagraph,
} from "react-icons/bi";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { useCallback } from "react";

const RichTextEditor = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          level: [2],
        },
      }),
      Link.configure({
        autolink: false,
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          class:
            "underline decoration-rose-500 cursor-pointer font-semibold text-rose-500",
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          " min-h-[160px] max-w-full border-2 border-slate-300 dark:border-gray-800 rounded bg-slate-100 dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500 focus-visible:border-0 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="gap-4">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  const setLink = useCallback(() => {
    if (!editor) return null;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="my-2 border-2 border-slate-300 dark:border-gray-800 rounded p-1">
      <Toggle
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <BiHeading className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("paragraph")}
        onPressedChange={() => editor.chain().focus().setParagraph().run()}
      >
        <BiParagraph className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BiBold className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <BiItalic className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <BiCodeAlt className="w-4 h-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("link")}
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <BiLinkAlt className="w-4 h-4" />
      </Toggle>
    </div>
  );
};

export default RichTextEditor;
