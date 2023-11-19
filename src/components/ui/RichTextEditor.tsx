"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toggle } from "./Toggle";
import { BiBold, BiHeading, BiItalic } from "react-icons/bi";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "flex min-h-[80px] w-full border-2 border-slate-300 dark:border-gray-800 rounded bg-slate-100 dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500 focus-visible:border-0 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      console.log(editor.getHTML());
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
  if (!editor) return null;
  return (
    <div>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <BiHeading />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <BiBold />
      </Toggle>
      <Toggle size="sm">
        <BiItalic />
      </Toggle>
    </div>
  );
};

export default RichTextEditor;
