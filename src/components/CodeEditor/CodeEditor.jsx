import React from 'react';
import Editor from "@monaco-editor/react";

export const CodeEditor = ({ value, onChange }) => {
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineHeight: 1.5,
    wordWrap: 'on',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    padding: { top: 20, bottom: 20 },
    language: 'xml',
    theme: 'vs-light'
  };

  return (
    <Editor
      height="100%"
      defaultValue={value}
      onChange={onChange}
      options={editorOptions}
      className="editor-content"
    />
  );
}; 