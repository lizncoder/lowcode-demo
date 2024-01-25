import { FC, createElement } from "react";
import { Button, Space } from "antd";
import { useDrop } from "react-dnd";
import { Component } from "@/editor/stores/components";
import { ItemType } from "@/editor/item-type";
import { useComponents } from "@/editor/stores/components";
const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

const index: FC = () => {
  //获取物料区拖拽来的组件
  const { components } = useComponents();

  const renderComponents = (components: Component[]): any => {
    return components.map((component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }
      return createElement(
        ComponentMap[component.name],
        { key: component.id, id: component.id, ...component.props },
        component.props.children ?? renderComponents(component.children ?? [])
      );
    });
  };

  //如果拖拽的组件可以放置，canDrop则为true，通过这个可以给组件添加边框
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      return {
        id: 1,
      };
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{ border: canDrop ? "1px solid green" : "1px solid #ccc" }}
      className="p-[24px] h-[100%]"
    >
      {renderComponents(components)}
    </div>
  );
};

export default index;
