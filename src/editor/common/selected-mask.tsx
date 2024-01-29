import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { createPortal } from "react-dom";

interface Props {
  //组件id
  componentId: number;

  //选中的容器class
  containerClassName: string;

  //文档容器class
  offsetContainerClassName: string;
}

const SelectedMask = (
  { componentId, containerClassName, offsetContainerClassName }: Props,
  ref: any
) => {
  //当前Mask的坐标
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  //对外暴露更新遮罩层位置方法
  useImperativeHandle(ref, () => ({
    updatePosition,
  }));

  const updatePosition = () => {
    if (!componentId) return;

    //文档容器
    const container = document.querySelector(`.${offsetContainerClassName}`);
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);

    if (!node) return;

    //获取节点位置
    const { top, left, width, height } = node.getBoundingClientRect();
    //获取容器位置
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();

    //计算位置
    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft,
      width,
      height,
    });
  };

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  return createPortal(
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        width: position.width,
        height: position.height,
        backgroundColor: "rgba(66,133,244,0.2)",
        border: "1px solid rgb(66,133,244)",
        pointerEvents: "none",
        zIndex: 1003,
        borderRadius: "4px",
        boxSizing: "border-box",
      }}
    ></div>,
    document.querySelector(`.${containerClassName}`)!
  );
};

export default forwardRef(SelectedMask);
