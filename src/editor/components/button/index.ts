import { Context } from "@/editor/types/interface";
import { ItemType } from "@/editor/item-type";
import ButtonDev from "./dev";
import ButtonProd from "./prod";

export default (ctx: Context) => {
  ctx.registerComponent(ItemType.Button, {
    name: ItemType.Button,
    desc: "按钮",
    defaultProps: {
      text: {
        type: "static",
        value: "按钮",
      },
    },
    dev: ButtonDev,
    prod: ButtonProd,
    setter: [
      {
        name: "type",
        label: "按钮类型",
        type: "select",
        options: [
          {
            label: "主按钮",
            value: "primary",
          },
          {
            label: "次按钮",
            value: "default",
          },
        ],
      },
    ],
    methods: [
      {
        name: "startLoading",
        desc: "开始Loading",
      },
      {
        name: "endLoading",
        desc: "结束Loading",
      },
    ],
    events: [
      {
        name: "onClick",
        desc: "点击事件",
      },
    ],
    order: 2,
    allowDrag: [ItemType.Space],
  });
};
