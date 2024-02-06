import { Space as AntdSpace } from "antd";
import { useDrop } from "@/editor/hooks/use-drop";
import { CommonComponentProps } from "@/editor/types/interface";

const Space = ({
  children,
  _id,
  _name,
  size,
  direction,
}: CommonComponentProps) => {
  const { canDrop, drop } = useDrop(_id, _name);

  if (!children?.length) {
    return (
      <AntdSpace
        ref={drop}
        data-component-id={_id}
        className="p-[16px]"
        style={{ border: canDrop ? "1px solid green" : "1px solid #ccc" }}
      >
        暂无内容
      </AntdSpace>
    );
  }
  return (
    <AntdSpace
      direction={direction}
      size={size}
      data-component-id={_id}
      ref={drop}
      className="p-[16px]"
      style={{
        border: canDrop ? "1px solid green" : "1px solid #ccc",
        width: direction === "vertical" ? "100%" : "",
      }}
    >
      {children}
    </AntdSpace>
  );
};

export default Space;
