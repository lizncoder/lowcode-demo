import { forwardRef, useImperativeHandle, useState } from "react";
import { Button as AntdButton } from "antd";
interface Props {
  //当前组件子节点
  children: any;

  [key: string]: string;
}

const prod = (props: Props, ref: any) => {
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      startLoading() {
        setLoading(true);
      },
      endLoading() {
        setLoading(false);
      },
    };
  });

  return (
    <AntdButton loading={loading} {...props}>
      {props.text}
    </AntdButton>
  );
};

export default forwardRef(prod);
