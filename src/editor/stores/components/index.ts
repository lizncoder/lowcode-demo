import { create } from "zustand";

//组件数据结构
export interface Component {
  /**
   * 组件唯一标识符
   */
  id: number;

  /**
   * 组件名称
   */
  name: string;

  /**
   * 组件属性
   */
  props: any;

  /**
   * 子组件
   */
  children?: Component[];
}

interface State {
  components: Component[];
}

interface Action {
  /**
   * 添加组件
   * @param component 组件属性
   * @returns
   */
  addComponent: (component: Component, parentId: number) => void;
}

export const useComponents = create<State & Action>((set) => ({
  components: [],
  addComponent: (component, parentId) => {
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);

        if (parentComponent) {
          if (parentComponent?.children) {
            parentComponent.children.push(component);
          } else {
            parentComponent.children = [component];
          }
        }
        return { components: [...state.components] };
      }

      return {
        components: [...state.components, component],
      };
    });
  },
}));

/**
 * 根据Id递归查找父组件
 *
 */
const getComponentById = (
  id: number,
  components: Component[]
): Component | null => {
  for (const component of components) {
    if (component.id === id) {
      return component;
    }
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result) {
        return result;
      }
    }
  }
  return null;
};
