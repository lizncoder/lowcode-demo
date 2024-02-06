import { useState } from "react";
import { Button, Space } from "antd";
import { useComponents } from "@/editor/stores/components";
import ComponentTree from "./component-tree";
import DefineVariable from "./define-variable";
const Header = () => {
  const { mode, setMode, setCurComponentId } = useComponents();
  const [open, setOpen] = useState(false);

  const [variableOpen, setVariableOpen] = useState(false);
  //打开组件树抽屉
  const onCancel = () => {
    setOpen((state) => !state);
  };

  //打开定义变量弹窗
  const onCancelVariable = () => {
    setVariableOpen((state) => !state);
  };
  return (
    <div className="flex justify-end w-[100%] px-[24px]">
      <Space>
        <Button onClick={onCancel}>查看大纲</Button>
        <Button onClick={onCancelVariable}>定义变量</Button>
        {mode === "edit" && (
          <Button
            onClick={() => {
              setMode("preview"); // 切换到预览模式
              setCurComponentId(null);
            }}
            type="primary"
          >
            预览
          </Button>
        )}
        {mode === "preview" && (
          <Button
            onClick={() => {
              setMode("edit"); // 切换到编辑模式
            }}
            type="primary"
          >
            退出预览
          </Button>
        )}
      </Space>
      <ComponentTree open={open} onCancel={onCancel} />
      <DefineVariable open={variableOpen} onCancel={onCancelVariable} />
    </div>
  );
};

export default Header;
