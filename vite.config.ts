import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#EAA516", //全局样式
        },
        javascriptEnabled: true,
      },
    },
  },
});
