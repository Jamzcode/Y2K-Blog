/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";

import { Undo } from "lucide-react";
import { Redo } from "lucide-react";
import { Bold } from "lucide-react";
import { Italic } from "lucide-react";
import { Underline } from "lucide-react";
import { Strikethrough } from "lucide-react";
import { AlignLeft } from "lucide-react";
import { AlignCenter } from "lucide-react";
import { AlignRight } from "lucide-react";
import { AlignJustify } from "lucide-react";

function Divider() {
  return <div className="w-2" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(
          () => {
            $updateToolbar();
          },
          { editor },
        );
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  return (  
  <div className="flex w-full justify-center bg-amber-50" ref={toolbarRef}>
      {/* UNDO */}
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="border-black border-2 w-10 h-10"
        aria-label="Undo"
      >
        <Undo
          size={20}
          className="text-gray-600 hover:text-black hover:cursor-pointer"
        />
      </button>
      {/* REDO */}
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="border-black border-2 w-10 h-10"
        aria-label="Redo"
      >
        <Redo size={20} className="text-gray-600 hover:text-black" />
      </button>
      <Divider />
      {/* BOLD */}
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        // className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
        className="border-black border-2 w-10 h-10"
        aria-label="Format Bold"
      >
        <Bold
          size={20}
          className="text-gray-600 hover:text-black hover:cursor-pointer"
        />{" "}
      </button>
      {/* ITALIC */}
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        // className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        className="border-black border-2 w-10 h-10"
        aria-label="Format Italics"
      >
        <Italic
          size={20}
          className="text-gray-600 hover:text-black hover:cursor-pointer"
        />
      </button>
      {/* UNDERLINE */}
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        // className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        className="border-black border-2 w-10 h-10"
        aria-label="Format Underline"
      >
        <Underline
          size={20}
          className="text-gray-600 hover:text-black hover:cursor-pointer"
        />{" "}
      </button>
      {/* STRIKETHROUGH */}
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        // className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
        className="border-black border-2 w-10 h-10"
        aria-label="Format Strikethrough"
      >
        <Strikethrough
          size={20}
          className="text-gray-600 hover:text-black hover:cursor-pointer"
        />{" "}
      </button>
      <Divider />
      {/* FORMAT LEFT */}
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="border-black border-2 w-10 h-10"
        aria-label="Left Align"
      >
        <AlignLeft
          size={20}
          className="text-gray-600 hover:text-black hover:cursor-pointer"
        />{" "}
      </button>
      {/* FORMAT CENTER */}
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        // className="toolbar-item spaced"
        className="border-black border-2 w-10 h-10"
        aria-label="Center Align"
      >
        <AlignCenter
          size={20}
          className="text-gray-600 hover:text-black hover:cursor-pointer"
        />{" "}
      </button>
      {/* FORMAT RIGHT */}
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        // className="toolbar-item spaced"
        className="border-black border-2 w-10 h-10"
        aria-label="Right Align"
      >
        <AlignRight
          size={20}
          className="text-gray-600 hover:text-black hover:cursor-pointer"
        />{" "}
      </button>
      {/* JUSTIFY */}
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        // className="toolbar-item"
        className="border-black border-2 w-10 h-10"
        aria-label="Justify Align"
      >
        <AlignJustify
          size={20}
          className="text-gray-600 hover:text-black hover:cursor-pointer"
        />{" "}
      </button>{" "}
    </div>
  
  );
}
