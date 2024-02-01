import { Collapse, Input, Select } from "antd";
import { useComponents } from "@/editor/stores/components";
import { componentEventMap } from "@/editor/types/layouts/componentEventMapType";

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
  const { curComponent, curComponentId, updateComponentProps } =
    useComponents();

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
            </Collapse.Panel>
          </Collapse>
        );
      })}
    </div>
  );
};

export default Event;
