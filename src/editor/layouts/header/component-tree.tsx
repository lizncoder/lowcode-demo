import { Modal, Tree } from "antd";
import { useComponents } from "@/editor/stores/components";

interface ComponentTreeProps {
  open: boolean;

  //父组件传过来的关闭弹窗方法
  onCancel: () => void;
}

const ComponentTree = ({ open, onCancel }: ComponentTreeProps) => {
  const { components, setCurComponentId } = useComponents();

  //选择组建后，关闭弹窗，并高亮展示选中的组件
  const componentSelect = ([selectedKey]: any[]) => {
    console.log("selectedKey", selectedKey);
    setCurComponentId(selectedKey);
    onCancel && onCancel();
  };

  return (
    <Modal
      open={open}
      title="组件树"
      onCancel={onCancel}
      destroyOnClose
      footer={null}
    >
      <Tree
        fieldNames={{ title: "name", key: "id" }}
        treeData={components as any}
        showLine={true}
        defaultExpandAll
        onSelect={componentSelect}
      />
    </Modal>
  );
};

export default ComponentTree;
