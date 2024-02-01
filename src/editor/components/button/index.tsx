import { Button as AntdButton } from "antd";
interface Props {
  //当前组件子节点
  children: any;

  [key: string]: string;
}

const index = ({ children, ...args }: Props) => {
  return <AntdButton {...args}>{children}</AntdButton>;
};

export default index;
