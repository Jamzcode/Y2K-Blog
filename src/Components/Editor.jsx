import { useState, useRef, useEffect } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import ToolbarPlugin from "./Toolbar";
import EditorRefPlugin from "./EditorRef";
import { $getRoot } from "lexical";

export default function Editor() {
  const editorRef = useRef(null);
  const theme = {};
  const title = useRef("");
  const editorHtmlRef = useRef(null);

  function onError(error) {
    console.error(error);
  }

  const initialConfig = {
    namespace: "Editor",
    theme,
    onError,
  };

  function onChange(editorState, editor) {
    editorState.read(() => {
      editorHtmlRef.current = $generateHtmlFromNodes(editor);
      console.log(editorHtmlRef.current);
    });
  }

  const handleSave = async (publish) => {
    const payload = {
      title: title.current.value,
      body: editorHtmlRef.current,
      published: publish,
    };

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Save failed:", data.error);
        return;
      }

      title.current.value = "";
      editorRef.current.update(() => {
        $getRoot().clear();
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full w-full border-4 border-blue-700">
      <label>
        {" "}
        Title:{" "}
        <input
          placeholder="Quand j'etais jeune..."
          ref={title}
          className="bg-white"
          required
        />
      </label>

      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="w-full h-150 left-4  bg-amber-200"
              aria-placeholder={"Enter some text..."}
              placeholder={<div className="absolute">Enter some text...</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={onChange} />
        <EditorRefPlugin editorRef={editorRef} />
      </LexicalComposer>
      <button
        className="aero-btn"
        onClick={() => {
          handleSave(false);
        }}
      >
        Save
      </button>
      <button
        class="aero-btn"
        onClick={() => {
          handleSave(true);
        }}
      >
        Save & Publish
      </button>
    </div>
  );
}
