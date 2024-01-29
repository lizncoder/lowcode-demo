import { Button, Space } from "antd";
import { useComponents } from "@/editor/stores/components";

const Header = () => {
  const { mode, setMode, setCurComponentId } = useComponents();

  return (
    <div className="flex justify-end w-[100%] px-[24px]">
      <Space>
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
            编辑
          </Button>
        )}
      </Space>
    </div>
  );
};

export default Header;
