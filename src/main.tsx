import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import Layout from "./editor/layouts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <DndProvider backend={HTML5Backend}>
    <Layout />
  </DndProvider>
);
