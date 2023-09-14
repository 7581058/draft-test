import TextBlock from "./components/TextBlock";
import TextEditor from "./components/TextEditor";
import { Drawer } from "antd";
import { useState } from "react";
import style from "./App.module.scss";
import { convertToRaw, convertFromRaw } from "draft-js";

function App() {
  const [open, setOpen] = useState(false);
  const [editoropen, seteditorOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleEditorFocus = () => {
    seteditorOpen(true);
  };

  const handleEditorBlur = () => {
    seteditorOpen(false);
  };

  return (
    <div className={style.container}>
      <TextBlock />
      <div className={style.btnBlock} onClick={showDrawer}>
        block
      </div>
      <Drawer
        title="블럭추가하기"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className={style.textForm}>
          <span className={style.label}>텍스트 추가하기</span>
          <div className={style.menu}></div>
          <span className={style.label}>텍스트 첨부</span>
          <div
            className={`${style.editorContainer} ${
              editoropen ? style.opened : ""
            }`}
            onFocus={handleEditorFocus}
            onBlur={handleEditorBlur}
          >
            <TextEditor />
          </div>
          <button className={style.btnAdd}>텍스트 추가하기</button>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
