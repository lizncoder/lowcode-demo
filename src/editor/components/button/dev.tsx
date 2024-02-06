import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "@/editor/types/interface";

const Button = ({ _id, type, text }: CommonComponentProps) => {
  return (
    <AntdButton type={type} data-comonent-id={_id}>
      {text}
    </AntdButton>
  );
};

export default Button;
