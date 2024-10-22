import { createPortal } from "react-dom";

export default function SidebarArea() {
  return createPortal(
    <aside>
      <h2>Your Project</h2>
      <ul></ul>
      <button>Add project</button>
    </aside>,
    document.getElementById("modal-root")
  );
}
