import React from "react";

import Space from "@/editor/components/space";
import Button from "@/editor/components/button";

import { Component, useComponents } from "@/editor/stores/components";

const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

const ProdStage = () => {
  const { components } = useComponents();

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
            ...component.props,
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
