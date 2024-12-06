"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Underline,
  Link as LinkIcon,
  Image,
  RotateCcw,
  RotateCw,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
};

const ToolbarButton = ({ 
  onClick, 
  isActive, 
  children, 
  className = "" 
}: { 
  onClick: (e: React.MouseEvent) => void;
  isActive?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={`p-1 rounded hover:bg-gray-100 ${
      isActive ? "text-blue-500" : "text-gray-600"
    } ${className}`}
  >
    {children}
  </button>
);

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  const items = [
    {
      icon: <RotateCcw className="w-4 h-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: false,
    },
    {
      icon: <RotateCw className="w-4 h-4" />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: false,
    },
    {
      type: "divider",
    },
    {
      icon: <Bold className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <Italic className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <Underline className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      icon: <Strikethrough className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      type: "divider",
    },
    {
      icon: <List className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      type: "divider",
    },
    {
      icon: <LinkIcon className="w-4 h-4" />,
      onClick: () => {
        const url = window.prompt("URL:");
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
      isActive: editor.isActive("link"),
    },
    {
      icon: <Image className="w-4 h-4" />,
      onClick: () => {
        const url = window.prompt("URL de la imagen:");
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      },
      isActive: editor.isActive("image"),
    },
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="px-3 py-2 flex items-center justify-center gap-1">
        {items.map((item, index) => {
          if (item.type === "divider") {
            return (
              <div
                key={index}
                className="w-[1px] h-4 bg-gray-200 mx-2"
              />
            );
          }

          return (
            <ToolbarButton
              key={index}
              onClick={item.onClick}
              isActive={item.isActive}
              className="hover:bg-gray-50"
            >
              {item.icon}
            </ToolbarButton>
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;