import React, { useRef } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { EditorToolbar } from './EditorToolBar';

interface RichTextEditorProps {
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  editorState,
  onEditorStateChange,
}) => {
  const editorRef = useRef<Editor>(null);

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onEditorStateChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleToggleStyle = (style: string) => {
    onEditorStateChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleToggleBlockType = (blockType: string) => {
    onEditorStateChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  return (
    <div className="w-full">
      <EditorToolbar
        handleToggleStyle={handleToggleStyle}
        handleToggleBlockType={handleToggleBlockType}
      />

      <div
        className="border rounded-md border-gray-300 p-3 min-h-[11rem] max-h-[18rem] overflow-y-auto bg-white text-sm text-gray-800"
        onClick={focusEditor}
      >
        {/* Apply placeholder visibility manually */}
        <div className={`text-gray-400 pointer-events-none select-none absolute ${editorState.getCurrentContent().hasText() ? 'hidden' : ''}`}>
          Enter your content here...
        </div>

        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={onEditorStateChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={getDefaultKeyBinding}
          placeholder="Enter your content here..." // fallback
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
