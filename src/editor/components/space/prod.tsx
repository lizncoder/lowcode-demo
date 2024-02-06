import { Space as AntdSpace } from "antd";
import { CommonComponentProps } from "@/editor/types/interface";

const Space = ({ children, size, direction }: CommonComponentProps) => {
  return (
    <AntdSpace size={size} direction={direction}>
      {children}
    </AntdSpace>
  );
};

export default Space;
