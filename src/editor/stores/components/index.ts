import { create } from "zustand";
import { clone } from "lodash";
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
  //生成的组件数组
  components: Component[];

  //当前需那种组件Id
  curComponentId?: number | null;

  //当前选中的组件
  curComponent?: Component | null;

  //模式
  mode: "edit" | "preview";
}

interface Action {
  /**
   * 添加组件
   * @param component 组件属性
   * @returns
   */
  addComponent: (component: Component, parentId: number) => void;

  /**
   * 设置当前选中组件Id
   * @param id 选中组件Id
   * @returns
   */
  setCurComponentId: (componentId: number | null) => void;

  /**
   * 更新组件属性函数
   * @param componentId 组件Id
   * @param props 组件属性
   * @returns ComponentProps
   */
  updateComponentProps: (componentId: number, props: any) => void;

  /**
   * 设置模式
   * @param mode 模式
   * @returns
   */
  setMode: (mode: State["mode"]) => void;
}

export const useComponents = create<State & Action>((set) => ({
  components: [],
  mode: "edit",
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
        return { ...state };
      }

      return {
        ...state,
        components: [...state.components, component],
      };
    });
  },
  setCurComponentId: (componentId) => {
    set((state) => {
      const curCom = getComponentById(componentId, state.components);
      return { ...state, curComponentId: componentId, curComponent: curCom };
    });
  },
  updateComponentProps: (componentId, props) => {
    set((state) => {
      const cs = updateComponentById(componentId, props, state.components);
      return { ...state, components: cs };
    });
  },
  setMode: (mode) => {
    set((state) => ({ ...state, mode }));
  },
}));

/**
 * 根据Id递归查找父组件
 * @param id 选中组件id
 * @param components 组件数组
 * @returns
 */
const getComponentById = (
  id: number | null,
  components: Component[]
): Component | null => {
  for (const component of components) {
    if (component.id == Number(id)) {
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

/**
 * 更新组件属性
 * @param id 组件Id
 * @param props 组件属性
 * @param components 组件数组
 * @returns 组价数组
 */
const updateComponentById = (
  id: number,
  props: any,
  components: Component[]
): Component[] => {
  const coms = clone(components);
  for (const component of coms) {
    if (component.id == Number(id)) {
      component.props = { ...component.props, ...props };
    }
    if (component.children && component.children.length > 0) {
      updateComponentById(id, props, component.children);
    }
  }

  return coms;
};
