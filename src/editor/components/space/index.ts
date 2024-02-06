import { Context } from "@/editor/types/interface";
import { ItemType } from "@/editor/item-type";
import SpaceDev from "./dev";
import SpaceProd from "./prod";

const Space = (ctx: Context) => {
  ctx.registerComponent(ItemType.Space, {
    name: ItemType.Space,
    desc: "间距",
    defaultProps: {
      size: { type: "static", value: "middle" },
    },
    dev: SpaceDev,
    prod: SpaceProd,
    setter: [
      {
        name: "direction",
        label: "间距方向",
        type: "select",
        options: [
          { label: "水平", value: "horizontal" },
          { label: "垂直", value: "vertical" },
        ],
      },
      {
        name: "size",
        label: "间距大小",
        type: "select",
        options: [
          {
            label: "小",
            value: "small",
          },
          {
            label: "中",
            value: "middle",
          },
          {
            label: "大",
            value: "large",
          },
        ],
      },
    ],
    order: 1,
    allowDrag: [ItemType.Space],
  });
};
