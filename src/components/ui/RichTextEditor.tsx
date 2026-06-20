"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading2, Heading3, List, ListOrdered, Quote,
  AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, Minus, Undo, Redo,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder = "Start writing your article..." }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-navy underline" } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[320px] px-4 py-3 focus:outline-none",
      },
    },
  });

  // Sync external value changes (e.g. when loading existing post)
  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
      active ? "bg-navy text-white" : "text-body hover:bg-gray-100"
    }`;

  function setLink() {
    const url = window.prompt("Enter URL", editor?.getAttributes("link").href || "https://");
    if (url === null) return;
    if (url === "") { editor?.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-navy/20 focus-within:border-navy transition">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-2 border-b border-gray-100 bg-gray-50">
        {/* History */}
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={`${btn(false)} disabled:opacity-30`}><Undo className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={`${btn(false)} disabled:opacity-30`}><Redo className="w-3.5 h-3.5" /></button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Headings */}
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))}><Heading2 className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))}><Heading3 className="w-3.5 h-3.5" /></button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Marks */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))}><Bold className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))}><Italic className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive("underline"))}><UnderlineIcon className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive("strike"))}><Strikethrough className="w-3.5 h-3.5" /></button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Lists */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))}><List className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))}><ListOrdered className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))}><Quote className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn(false)}><Minus className="w-3.5 h-3.5" /></button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Alignment */}
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={btn(editor.isActive({ textAlign: "left" }))}><AlignLeft className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={btn(editor.isActive({ textAlign: "center" }))}><AlignCenter className="w-3.5 h-3.5" /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={btn(editor.isActive({ textAlign: "right" }))}><AlignRight className="w-3.5 h-3.5" /></button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Link */}
        <button type="button" onClick={setLink} className={btn(editor.isActive("link"))}><LinkIcon className="w-3.5 h-3.5" /></button>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} className="bg-white" />

      {/* Character count */}
      <div className="px-4 py-1.5 bg-gray-50 border-t border-gray-100 text-right">
        <span className="text-xs text-muted">{editor.storage.characterCount?.characters?.() ?? 0} characters</span>
      </div>
    </div>
  );
}
