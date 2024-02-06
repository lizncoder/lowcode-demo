import { useState } from "react";
import { Table, Modal } from "antd";
import { useVariablesStore, type Variable } from "@/editor/stores/variable";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSelect: (variable: any) => void;
}

const SelectVariableModal = ({ open, onCancel, onSelect }: Props) => {
  const { variables } = useVariablesStore();

  const columns = [
    {
      title: "变量名",
      dataIndex: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
    },
    {
      title: "默认值",
      dataIndex: "defaultValue",
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
  ];

  const rowSelect = (variable: Variable) => {
    onSelect && onSelect(variable);
    onCancel();
  };

  return (
    <Modal open={open} onCancel={onCancel} width="800px" title="变量列表">
      <Table
        rowKey="name"
        columns={columns}
        dataSource={variables}
        onRow={(record) => ({ onClick: () => rowSelect(record) })}
      />
    </Modal>
  );
};

export default SelectVariableModal;
