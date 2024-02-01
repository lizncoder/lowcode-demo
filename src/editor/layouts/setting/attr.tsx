import { useEffect } from "react";
import { Form, Select, Input } from "antd";
import { ItemType } from "@/editor/item-type";
import { useComponents } from "@/editor/stores/components";

const componentSettingMap = {
  [ItemType.Button]: [
    {
      name: "type",
      label: "按钮类型",
      type: "select",
      options: [
        {
          label: "主按钮",
          value: "primary",
        },
        {
          label: "次按钮",
          value: "default",
        },
      ],
    },
    {
      name: "children",
      label: "文本",
      type: "input",
    },
  ],
  [ItemType.Space]: [
    {
      name: "size",
      label: "间距大小",
      type: "select",
      options: [
        {
          label: "大",
          value: "large",
        },
        {
          label: "中",
          value: "middle",
        },
        {
          label: "小",
          value: "small",
        },
      ],
    },
  ],
};

const Attr = () => {
  const { curComponent, curComponentId, updateComponentProps } =
    useComponents();

  const [form] = Form.useForm();

  useEffect(() => {
    // 初始化表单
    form.resetFields();
    form.setFieldsValue(curComponent?.props);
  }, [curComponent]);

  const renderFormElement = (setting: any) => {
    const { type, options } = setting;
    if (type === "select") {
      return <Select options={options}></Select>;
    } else if (type === "input") {
      return <Input />;
    }
  };

  const valueChange = (changesValues: any) => {
    if (curComponentId) {
      updateComponentProps(curComponentId, changesValues);
    }
  };

  if (!curComponentId || !curComponent) return null;

  return (
    <div className="pt-[20px]">
      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        {(componentSettingMap[curComponent!.name] || []).map((setting) => {
          return (
            <Form.Item
              name={setting.name}
              label={setting.label}
              key={setting.name}
            >
              {renderFormElement(setting)}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
};

export default Attr;
