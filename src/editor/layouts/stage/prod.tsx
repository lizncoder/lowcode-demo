import React from "react";
import { message } from "antd";
import Space from "@/editor/components/space";
import Button from "@/editor/components/button";

import { componentEventMap } from "@/editor/types/layouts/componentEventMapType";
import { Component, useComponents } from "@/editor/stores/components";

const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

const ProdStage = () => {
  const { components } = useComponents();

  //事件处理
  const handleEvent = (component: Component) => {
    let props: any = {};
    if (componentEventMap[component.name]?.length) {
      componentEventMap[component.name].forEach((event) => {
        const eventConfig = component.props[event.name];
        if (eventConfig) {
          const { type, config } = eventConfig;
          props[event.name] = () => {
            //根据动作类型显示消息
            if (type === "showMessage") {
              if (config.type === "success") {
                message.success(config.text);
              } else if (config.type === "error") {
                message.error(config.text);
              }
            }
          };
        }
      });
    }
    return props;
  };

  const renderComponents = (components: Component[]): React.ReactNode => {
    return components.map((component: Component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }

      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          {
            key: component.id,
            id: component.id,
            ...handleEvent(component),
          },
          component.props.children || renderComponents(component.children || [])
        );
      }
      return null;
    });
  };

  return <div>{renderComponents(components)}</div>;
};

export default ProdStage;
