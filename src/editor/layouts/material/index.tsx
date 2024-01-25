//物料区
import { FC } from "react";
import ComponentItem from "@/editor/common/component-item";
import { ItemType } from "@/editor/item-type";
import { useComponents } from "@/editor/stores/components/index";

const Material: FC = () => {
  const { addComponent } = useComponents();

  /**
   * 拖拽结束，添加组件到画布
   * @param dropResult
   */
  const onDragEnd = (dropResult: { name: string; props: any }) => {
    addComponent({
      id: new Date().getTime(),
      name: dropResult.name,
      props: dropResult.props,
    });
  };
  return (
    <div className="flex p-[10px] gap-4 flex-wrap">
      <ComponentItem
        name={ItemType.Button}
        description="按钮"
        onDragEnd={onDragEnd}
      />
    </div>
  );
};

export default Material;
