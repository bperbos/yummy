import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home";

window.addEventListener("load", () => {
  const root = createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(<Home />);
});
