import { useState } from "react";
import { Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import SelectVariableModal from "../select-variable-modal";
interface Value {
  type: "static" | "variable";
  value: any;
}

interface Props {
  value?: Value;
  onChange?: (value: Value) => void;
}

const SettingFormItemInput = ({ value, onChange }: Props) => {
  const [visible, setVisible] = useState(false);
  console.log("value,onChangeHandle", value, onChange);
  const valueChange = (e: any) => {};

  const onSelect = (record: any) => {
    console.log("record:", record, value, onChange);
    onChange &&
      onChange({
        type: "variable",
        value: record.name,
      });
  };

  return (
    <div className="flex gap-[8px]">
      <Input
        disabled={value?.type === "variable"}
        value={value?.type === "static" || !value ? value?.value : ""}
        onChange={valueChange}
      />
      <SettingOutlined
        onClick={() => setVisible(true)}
        className="cursor-pointer"
        style={{ color: value?.type === "variable" ? "blue" : "" }}
      />
      {/* 弹窗内容 */}
      <SelectVariableModal
        onCancel={() => {
          setVisible(false);
        }}
        open={visible}
        onSelect={onSelect}
      />
    </div>
  );
};

export default SettingFormItemInput;
