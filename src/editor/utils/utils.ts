import { useComponentConfigStore } from "@/editor/stores/component-config";

//获取科接受的组件
export const getAcceptDrop = (componentName: string) => {
  const { componentConfig } = useComponentConfigStore.getState();
  return Object.values(componentConfig)
    .filter((o) => o.allowDrag.includes(componentName))
    .map((o) => o.name);
};
