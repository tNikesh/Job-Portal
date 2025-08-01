// components/EditorToolbar.tsx
import React from 'react';
import { RichUtils } from 'draft-js';

interface EditorToolbarProps {
  handleToggleStyle: (style: string) => void;
  handleToggleBlockType: (blockType: string) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ handleToggleStyle, handleToggleBlockType }) => {
  return (
    <div className="bg-gray-100  w-fit p-1 flex space-x-2">
      <button
        onClick={() => handleToggleStyle('BOLD')}
        type="button"
        className="p-2  cursor-pointer"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => handleToggleStyle('ITALIC')}
        type="button"
        className="p-2  cursor-pointer"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => handleToggleBlockType('unordered-list-item')}
        type="button"
       className="p-2  cursor-pointer"
      >
        ul
      </button>
      <button
        onClick={() => handleToggleBlockType('ordered-list-item')}
        type="button"
       className="p-2  cursor-pointer"
      >
        ol
      </button>
    </div>
  );
};
