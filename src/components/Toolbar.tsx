import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

export const toolbarGroups = [
  {
    tools: [
      {
        text: "14",
        type: "size",
        handle: "inline",
      },
      {
        text: "기본서체",
        type: "font",
        handle: "inline",
      },
      {
        text: "가",
        type: "colors",
        handle: "inline",
      },
      {
        text: "B",
        type: "BOLD",
        handle: "inline",
      },
      {
        text: "I",
        type: "ITALIC",
        handle: "inline",
      },
    ],
  },
  {
    tools: [
      {
        text: "U",
        type: "UNDERLINE",
        handle: "inline",
      },
      {
        text: "S",
        type: "STRIKETHROUGH",
        handle: "inline",
      },
      {
        text: "OL",
        type: "ordered-list-item",
        handle: "inline",
      },
      {
        text: "UL",
        type: "unordered-list-item",
        handle: "inline",
      },
      {
        text: "X",
        type: "unstyled",
        handle: "inline",
      },
    ],
  },
];

//onMouseDown={(e) => handleTogggleClick(e, "STRIKETHROUGH")}
//onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}

export default function Toolbar({ tools }) {
  const [editorState, setEditorState] = React.useState<EditorState>(
    EditorState.createEmpty()
  );

  const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div>
      {tools.map((tool, index) =>
        tool.handle === "inline" ? (
          <button
            key={index}
            onMouseDown={(e) => handleTogggleClick(e, tool.type)}
          >
            {tool.text}
          </button>
        ) : (
          <button
            key={index}
            onMouseDown={(e) => handleBlockClick(e, tool.type)}
          >
            {tool.text}
          </button>
        )
      )}
    </div>
  );
}

{
  /* <button onMouseDown={handleClickColors}>가</button>
              <button onMouseDown={(e) => handleTogggleClick(e, "tright")}>
                센터
              </button>
              <button onMouseDown={(e) => handleTogggleClick(e, "UNDERLINE")}>
                언더
              </button>
              <button onMouseDown={(e) => handleTogggleClick(e, "size36")}>
                14
              </button>
              <button
                className={styles.btnFont}
                onMouseDown={(e) => handleTogggleClick(e, "font1")}
              >
                기본서체
              </button>
              <button onMouseDown={(e) => handleTogggleClick(e, "unstyled")}>
                clean
              </button>
              <button onMouseDown={(e) => handleTogggleClick(e, "BOLD")}>
                bold
              </button>
              <button onMouseDown={(e) => handleTogggleClick(e, "ITALIC")}>
                italic
              </button>
              <button
                onMouseDown={(e) => handleTogggleClick(e, "STRIKETHROUGH")}
              >
                strikthrough
              </button>
              <button
                onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}
              >
                ol
              </button>
              <button
                onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}
              >
                ul
              </button> */
}
