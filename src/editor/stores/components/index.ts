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
  addComponent: (component: Component) => void;
}

export const useComponents = create<State & Action>((set) => ({
  components: [],
  addComponent: (component) => {
    set((state) => {
      return {
        components: [...state.components, component],
      };
    });
  },
}));
