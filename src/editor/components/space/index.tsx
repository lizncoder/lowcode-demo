import { FC } from "react";
import { Space as AntdSpace } from "antd";
import { useDrop } from "react-dnd";
import { ItemType } from "@/editor/item-type";

interface Props {
  //当前组件的子节点
  children: any;

  //当前组件id
  id: number;
}

const Space: FC<Props> = ({ children, id }) => {
  //组件放置监听
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }
      return {
        id,
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  //判断Space是否有子组件
  if (!children?.length) {
    return (
      <AntdSpace
        ref={drop}
        className="p-[16px]"
        style={{ border: canDrop ? "1px solid green" : "1px solid #ccc" }}
      >
        暂无内容
      </AntdSpace>
    );
  }

  return (
    <AntdSpace
      ref={drop}
      className="p-[16px]"
      style={{ border: canDrop ? "1px solid green" : "1px solid #ccc" }}
    >
      {children}
    </AntdSpace>
  );
};

export default Space;
