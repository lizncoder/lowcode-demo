import { useEffect } from "react";
import { Button, Form, Modal, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useVariablesStore, type Variable } from "@/editor/stores/variable";

interface Props {
  open: boolean;
  onCancel: () => void;
}

const DefineVariable = ({ open, onCancel }: Props) => {
  const [form] = Form.useForm();
  const { setVariables, variables } = useVariablesStore();
  console.log("variables:", variables);

  const onFinish = (vals: { variables: Variable[] }) => {
    setVariables(vals.variables);
    onCancel && onCancel();
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ variables });
    }
  }, [open]);

  return (
    <Modal
      open={open}
      title="定义变量"
      onCancel={onCancel}
      destroyOnClose
      onOk={() => {
        form.submit();
      }}
      width={700}
    >
      <Form<{ variables: Variable[] }>
        onFinish={onFinish}
        className="py-[20px]"
        form={form}
        initialValues={{ variables }}
      >
        <Form.List name="variables">
          {(files, { add, remove }) => (
            <>
              {files.map(({ key, name, ...rest }) => {
                return (
                  <Space key={key} className="flex mb-[8px]" align="baseline">
                    <Form.Item
                      {...rest}
                      name={[name, "name"]}
                      rules={[{ required: true, message: "变量名不能为空" }]}
                    >
                      <Input placeholder="请输入变量名" />
                    </Form.Item>
                    <Form.Item
                      {...rest}
                      name={[name, "type"]}
                      initialValue={"string"}
                    >
                      <Select
                        placeholder="请选择变量类型"
                        className="w-[140px]"
                        options={[{ label: "字符串", value: "string" }]}
                      />
                    </Form.Item>
                    <Form.Item {...rest} name={[name, "defaultValue"]}>
                      <Input placeholder="请输入默认值" />
                    </Form.Item>
                    <Form.Item {...rest} name={[name, "remark"]}>
                      <Input placeholder="请输入备注" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加变量
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default DefineVariable;
