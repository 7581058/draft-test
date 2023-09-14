import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import styles from "./Editor.module.scss";

export const toolbarGroups = [
  {
    tools: [
      {
        text: "14",
        type: "size",
        handle: "inline",
        //optionhandle: "handleClickColors",
      },
      {
        text: "기본서체",
        type: "font1",
        handle: "inline",
      },
      {
        text: "가",
        type: "colors",
        handle: "inline",
        optionhandle: "handleClickColors",
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
        text: "=",
        type: "TextAlign",
        handle: "block",
      },
      {
        text: "OL",
        type: "ordered-list-item",
        handle: "block",
      },
      {
        text: "UL",
        type: "unordered-list-item",
        handle: "block",
      },
      {
        text: "X",
        type: "unstyled",
        handle: "inline",
      },
    ],
  },
];

const StyleMap = {
  black: {
    color: "#111111",
  },
  gray: {
    color: "#E2E2E2",
  },
  white: {
    color: "#ffffff",
  },
  red: {
    color: "#FF0000",
  },
  orange: {
    color: "#ff9300",
  },
  yellow: {
    color: "#FFdb30",
  },
  green: {
    color: "#1FA99E",
  },
  blue: {
    color: "#00B3F2",
  },
  purple: {
    color: "#AA1F91",
  },
  blackbg: {
    backgroundColor: "#111111",
  },
  graybg: {
    backgroundColor: "#E2E2E2",
  },
  whitebg: {
    backgroundColor: "#ffffff",
  },
  redbg: {
    backgroundColor: "#FF0000",
  },
  orangebg: {
    backgroundColor: "#ff9300",
  },
  yellowbg: {
    backgroundColor: "#FFdb30",
  },
  greenbg: {
    backgroundColor: "#1FA99E",
  },
  bluebg: {
    backgroundColor: "#00B3F2",
  },
  purplebg: {
    backgroundColor: "#AA1F91",
  },
  size36: {
    fontSize: "36px",
  },
  tright: {
    textAlign: "right",
  },
  unstyled: {
    textDecoration: "none",
    color: "#000",
    backgroundColor: "transparent",
    fontWeight: "normal",
    fontSize: "14px",
  },
  font1: {
    fontFamily: "monospace",
  },
};

const textColor = [
  { label: "red", style: "black" },
  { label: "red", style: "gray" },
  { label: "red", style: "white" },
  { label: "red", style: "red" },
  { label: "red", style: "orange" },
  { label: "red", style: "yellow" },
  { label: "red", style: "green" },
  { label: "red", style: "blue" },
  { label: "red", style: "purple" },
];

const bgColor = [
  { label: "red", style: "blackbg" },
  { label: "red", style: "graybg" },
  { label: "red", style: "whitebg" },
  { label: "red", style: "redbg" },
  { label: "red", style: "orangebg" },
  { label: "red", style: "yellowbg" },
  { label: "red", style: "greenbg" },
  { label: "red", style: "bluebg" },
  { label: "red", style: "purplebg" },
];

export default function TextEditor() {
  const [editorState, setEditorState] = React.useState<EditorState>(
    EditorState.createEmpty()
  );

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  //////////////////////////////////////////
  //에디터핸들

  const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  /////////////////////////////////////////
  const [isFocused, setIsFocused] = useState(false);

  const handleFocusEditor = () => {
    setIsFocused(true);
  };

  const handleBlurEditor = () => {
    setIsFocused(false);
    setiscolor(false);
  };

  ////////////////////////////////////////////////
  //색상옵션
  const [iscolor, setiscolor] = useState(false);

  const handleClickColors = (e) => {
    e.preventDefault();
    setiscolor(!iscolor);
  };

  /////////////////////////////////////////////////
  //출력
  const handleClickCheck = () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    console.log(data);
  };

  //////////////////////////////
  //툴바이동
  const [currentToolbar, setCurrentToolbar] = useState(0);

  const nextToolbar = (e) => {
    e.preventDefault();

    if (currentToolbar < toolbarGroups.length - 1) {
      setCurrentToolbar(currentToolbar + 1);
    }
  };

  const prevToolbar = (e) => {
    e.preventDefault();

    if (currentToolbar > 0) {
      setCurrentToolbar(currentToolbar - 1);
    }
  };
  const isPrevButtonVisible = currentToolbar > 0;
  const isNextButtonVisible = currentToolbar < toolbarGroups.length - 1;

  //////////////////////////////

  return (
    <>
      <div className={styles.container}>
        {isFocused && (
          <div className={styles.toolbar}>
            <div className={styles.toolsWrap}>
              {toolbarGroups[currentToolbar].tools.map((tool, index) =>
                tool.handle === "inline" ? (
                  tool.optionhandle === "handleClickColors" ? (
                    <button key={index} onMouseDown={handleClickColors}>
                      {tool.text}
                    </button>
                  ) : (
                    <button
                      key={index}
                      onMouseDown={(e) => handleTogggleClick(e, tool.type)}
                    >
                      {tool.text}
                    </button>
                  )
                ) : (
                  <button
                    key={index}
                    onMouseDown={(e) => handleBlockClick(e, tool.type)}
                  >
                    {tool.text}
                  </button>
                )
              )}
              {/* <Toolbar tools={toolbarGroups[currentToolbar].tools} /> */}
              <div>
                {isPrevButtonVisible && (
                  <button onMouseDown={prevToolbar}>&lt;&lt;</button>
                )}
                {isNextButtonVisible && (
                  <button onMouseDown={nextToolbar}>&gt;&gt;</button>
                )}
              </div>
            </div>
          </div>
        )}
        {iscolor && isFocused && (
          <div className={styles.colors}>
            <span className={styles.label}>글자색</span>
            <div className={styles.textcolors}>
              {textColor.map((color) => (
                <div
                  onMouseDown={(e) => handleTogggleClick(e, color.style)}
                  className={`${styles.btnTextColor} ${styles[color.style]}`}
                >
                  가
                </div>
              ))}
            </div>
            <span className={styles.label}>글자배경색</span>
            <div className={styles.bgcolors}>
              {bgColor.map((color) => (
                <div
                  onMouseDown={(e) => handleTogggleClick(e, color.style)}
                  className={styles.btnBgColor}
                >
                  <div className={`${styles.innerrect} ${styles[color.style]}`}>
                    가
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`${styles.editorContainer}  ${
            isFocused ? styles.focused : ""
          }`}
          onFocus={handleFocusEditor}
          onBlur={handleBlurEditor}
        >
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            customStyleMap={StyleMap}
            placeholder="텍스트를 입력해주세요"
          />
        </div>
        {isFocused && (
          <button className={styles.btnAdd} onClick={handleClickCheck}>
            텍스트 입력완료
          </button>
        )}
      </div>
    </>
  );
}
