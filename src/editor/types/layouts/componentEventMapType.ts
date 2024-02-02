import { ItemType } from "@/editor/item-type";
export const componentEventMap = {
  [ItemType.Button]: [
    {
      name: "onClick",
      label: "点击事件",
    },
  ],
};

export const componentMethodMap = {
  [ItemType.Button]: [
    {
      name: "startLoading",
      label: "开始loading",
    },
    {
      name: "endLoading",
      label: "结束Loading",
    },
  ],
};
