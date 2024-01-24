import { FC, createElement } from "react";
import { Button, Space } from "antd";

const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};
//组件数据结构
interface Component {
  /**
   * 组件唯一标识符
   */
  id: number;

  /**
   * 组件名称
   */
  name: string;

  /**
   * 组件属性
   */
  props: any;

  /**
   * 子组件
   */
  children?: Component[];
}

const components: Component[] = [
  {
    id: 1,
    name: "Button",
    props: {
      type: "dashed",
      children: "按钮",
    },
  },
  {
    id: 2,
    name: "Space",
    props: {
      size: "large",
    },
    children: [
      {
        id: 3,
        name: "Button",
        props: {
          type: "primary",
          children: "按钮1",
        },
      },
      {
        id: 4,
        name: "Button",
        props: {
          type: "block",
          children: "按钮2",
        },
      },
    ],
  },
];

const index: FC = () => {
  const renderComponents = (components: Component[]): any => {
    return components.map((component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }
      return createElement(
        ComponentMap[component.name],
        component.props,
        component.props.children ?? renderComponents(component.children ?? [])
      );
    });
  };

  return <div>{renderComponents(components)}</div>;
};

export default index;
