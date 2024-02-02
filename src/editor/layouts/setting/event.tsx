import { useState } from "react";
import { Collapse, Input, Select, TreeSelect } from "antd";
import { useComponents, type Component } from "@/editor/stores/components";
import {
  componentEventMap,
  componentMethodMap,
} from "@/editor/types/layouts/componentEventMapType";

//事件数据类型
// type eventType = {
//   id: 1;
//   name: "Button";
//   props: {
//     //点击事件绑定显示消息动作
//     onClick: {
//       //动作类型
//       type: "showMessage";
//       config: {
//         //消息类型
//         type: "success";
//         //消息文本
//         text: "点击了按钮";
//       };
//     };
//   };
// };

const Event = () => {
  const { components, curComponent, curComponentId, updateComponentProps } =
    useComponents();
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null
  );

  //事件类型改变
  const typeChange = (eventName: string, value: string) => {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, { [eventName]: { type: value } });
  };

  //消息类型改变
  const messageTypeChange = (eventName: string, value: string) => {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props[eventName],
        config: {
          ...curComponent?.props[eventName].config,
          type: value,
        },
      },
    });
  };

  //消息文本改变
  const messageTextChange = (eventName: string, value: string) => {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props[eventName],
        config: {
          ...curComponent?.props[eventName].config,
          text: value,
        },
      },
    });
  };

  //找到组件事件选中的组件
  const handleSelectedComponent = (
    componentId: number,
    components: Component[]
  ) => {
    for (const component of components) {
      if (component.id === componentId) {
        return component;
      }
      handleSelectedComponent(componentId, component.children ?? []);
    }
    return null;
  };

  //更改组件事件
  const componentChange = (eventName: string, value: string | number) => {
    if (!curComponentId) return;

    //查找选中的组件
    const selectedCom = handleSelectedComponent(value as number, components);
    setSelectedComponent(selectedCom);

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props[eventName],
        config: {
          ...curComponent?.props[eventName].config,
          componentId: value,
        },
      },
    });
  };

  //注册组件执行的事件
  const componentMethodChange = (eventName: string, value: string | number) => {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props[eventName],
        config: {
          ...curComponent?.props[eventName].config,
          method: value,
        },
      },
    });
  };

  if (!curComponent || !curComponentId) return null;

  return (
    <div className="px-[12px]">
      {(componentEventMap[curComponent.name] || []).map((setting) => {
        return (
          <Collapse key={setting.name} defaultActiveKey={setting.name}>
            <Collapse.Panel header={setting.label} key={setting.name}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div>动作：</div>
                <div>
                  <Select
                    className="w-[160px]"
                    options={[
                      {
                        label: "显示提示",
                        value: "showMessage",
                      },
                      {
                        label: "组件方法",
                        value: "componentFunction",
                      },
                    ]}
                    onChange={(value) => {
                      typeChange(setting.name, value);
                    }}
                    value={curComponent?.props?.[setting.name]?.type}
                  />
                </div>
              </div>

              {curComponent?.props?.[setting?.name]?.type === "showMessage" && (
                <div className="flex flex-col gap-[12px] mt-[12px]">
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>类型：</div>
                    <div>
                      <Select
                        className="w-[160px]"
                        options={[
                          {
                            label: "成功",
                            value: "success",
                          },
                          {
                            label: "失败",
                            value: "error",
                          },
                        ]}
                        value={
                          curComponent?.props?.[setting?.name]?.config?.type
                        }
                        onChange={(value) => {
                          messageTypeChange(setting.name, value);
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div>文本：</div>
                    <div>
                      <Input
                        className="w-[160px]"
                        value={
                          curComponent?.props?.[setting?.name]?.config?.text ??
                          ""
                        }
                        onChange={(e) => {
                          messageTextChange(setting.name, e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {curComponent?.props?.[setting?.name]?.type ===
                "componentFunction" && (
                <div className="flex flex-col gap-[12px] mt-[12px]">
                  <div className="flex items-center gap-[10px]">
                    <div>组件：</div>
                    <div>
                      <TreeSelect
                        style={{ width: 160 }}
                        treeData={components}
                        fieldNames={{ label: "name", value: "id" }}
                        value={
                          curComponent?.props?.[setting?.name]?.config
                            ?.componentId
                        }
                        onChange={(value) =>
                          componentChange(setting.name, value)
                        }
                      />
                    </div>
                  </div>
                  {componentMethodMap[selectedComponent?.name ?? ""] && (
                    <div className="flex items-center gap-[10px]">
                      <div>方法：</div>
                      <div>
                        <Select
                          className="w-[160px]"
                          options={componentMethodMap[
                            selectedComponent?.name || ""
                          ].map((method) => ({
                            label: method.label,
                            value: method.name,
                          }))}
                          value={
                            curComponent?.props?.[setting?.name]?.config?.method
                          }
                          onChange={(value) =>
                            componentMethodChange(setting.name, value)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Collapse.Panel>
          </Collapse>
        );
      })}
    </div>
  );
};

export default Event;
