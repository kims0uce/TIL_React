import { useState } from "react";

import SidebarArea from "./components/SidebarArea";
import MainContentArea from "./components/MainContentArea";
import NoContentSelected from "./components/NoContentSelected";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    projects: [],
  });

  return (
    <main className="h-screen my-8 flex gap-8">
      <SidebarArea />
      <MainContentArea />
      <NoContentSelected />
    </main>
  );
}

export default App;
