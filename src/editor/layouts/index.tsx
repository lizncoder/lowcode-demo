import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./header";
import Material from "./material";
import Stage from "./stage";
import Setting from "./setting";
import ProdStage from "./stage/prod";

import { useComponents } from "@/editor/stores/components";

const Layout = () => {
  const { mode } = useComponents();

  return (
    <>
      <div className="h-[50px] flex items-center bg-red-300">
        <Header />
      </div>
      {mode == "edit" ? (
        <div className="h-[100vh] flex flex-col">
          <Allotment>
            <Allotment.Pane minSize={200} maxSize={400} preferredSize={200}>
              <Material />
            </Allotment.Pane>
            <Allotment.Pane>
              <Stage />
            </Allotment.Pane>
            <Allotment.Pane minSize={200} maxSize={400} preferredSize={200}>
              <Setting />
            </Allotment.Pane>
          </Allotment>
        </div>
      ) : (
        <ProdStage />
      )}
    </>
  );
};

export default Layout;
