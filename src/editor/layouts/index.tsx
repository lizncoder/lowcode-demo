import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./header";
import Material from "./material";
import Stage from "./stage";
import Setting from "./setting";

const Layout = () => {
  return (
    <>
      <div className="h-[100vh] flex flex-col">
        <div className="h-[50px] flex items-center bg-red-300">
          <Header />
        </div>
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
    </>
  );
};

export default Layout;
