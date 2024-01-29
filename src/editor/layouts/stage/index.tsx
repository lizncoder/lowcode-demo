import { FC, createElement, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { Component } from "@/editor/stores/components";
import { ItemType } from "@/editor/item-type";
import { useComponents } from "@/editor/stores/components";

import Space from "@/editor/components/space";
import Button from "@/editor/components/button";

import SelectedMask from "@/editor/common/selected-mask";
const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

const index: FC = () => {
  //获取物料区拖拽来的组件
  const { components, curComponentId, setCurComponentId } = useComponents();
  const selectedMaskRef = useRef<any>(null);
  const renderComponents = (components: Component[]): any => {
    return components.map((component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }
      return createElement(
        ComponentMap[component.name],
        {
          key: component.id,
          id: component.id,
          "data-component-id": component.id,
          ...component.props,
        },
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
        id: 0,
      };
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    const createMask = (e: any) => {
      //获取当前点击的元素
      const paths = e.composedPath();
      for (let i = 0; i < paths.length; i++) {
        const ele = paths[i];
        if (ele.getAttribute) {
          if (ele.getAttribute("data-component-id")) {
            const componentId = ele.getAttribute("data-component-id");
            setCurComponentId(componentId);
            break;
          }
        }
      }
    };

    let container = document.querySelector(".stage");
    if (container) {
      container.addEventListener("click", createMask, true);
    }
    return () => {
      if (container) {
        container.removeEventListener("click", createMask, true);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedMaskRef?.current) {
      selectedMaskRef.current.updatePosition();
    }
  }, [components.flat()]);

  return (
    <div
      ref={drop}
      style={{ border: canDrop ? "1px solid green" : "1px solid #ccc" }}
      className="p-[24px] h-[100%] stage"
    >
      {renderComponents(components)}
      {curComponentId && (
        <SelectedMask
          componentId={curComponentId}
          containerClassName={"select-mask-container"}
          offsetContainerClassName={"stage"}
          ref={selectedMaskRef}
        />
      )}
      <div className="select-mask-container"></div>
    </div>
  );
};

export default index;
