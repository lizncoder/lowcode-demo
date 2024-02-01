import { useState, useEffect } from "react";
import { Segmented } from "antd";
import { useComponents } from "@/editor/stores/components";
import ComponentAttr from "./attr";
import ComponentEvent from "./event";

const Setting = () => {
  const { curComponentId, curComponent } = useComponents();

  const [key, setKey] = useState<string | number>("属性");

  useEffect(() => {
    setKey("属性");
  }, [curComponentId]);

  if (!curComponentId || !curComponent) return null;

  return (
    <div>
      <Segmented
        block
        value={key}
        options={["属性", "事件"]}
        onChange={(val: string | number) => setKey(val)}
      />
      <div className="pt-[20px]">
        {key === "属性" && <ComponentAttr />}
        {key === "事件" && <ComponentEvent />}
      </div>
    </div>
  );
};
export default Setting;
