"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from '@tiptap/extension-character-count'
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    if (onChange) {
      onChange(newContent);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }), 
      Underline,
      Placeholder.configure({
        placeholder: 'Escribe tu contenido aquí...',
        emptyEditorClass: 'is-editor-empty',
      }),
      CharacterCount.configure({
        limit: 280
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[200px] py-4 px-2",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-[1116px] h-[584px] bg-white rounded-lg shadow-sm flex flex-col">
      <Toolbar editor={editor} content={content} />
      <EditorContent 
        editor={editor} 
        className="prose max-w-none flex-1 px-8 py-4 overflow-y-auto focus:outline-none"
      />
      <div className="px-8 py-2 text-sm text-gray-500 border-t">
        {editor?.storage.characterCount.characters()} words
      </div>
    </div>
  );
};

export default Tiptap;
