import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Menu } from "./components/menu/Menu";
import { Rules } from "./components/rules/Rules";
import { GameVsCPU } from "./components/game/vsCPU/GamevsCPU";
import { GameVsPlayer } from "./components/game/vsPlayer/GamevsPlayer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/Connect-Four-Game" element={<App />}>
        <Route path="/Connect-Four-Game" element={<Menu />} />
        <Route path="/Connect-Four-Game/rules" element={<Rules />} />
        <Route path="/Connect-Four-Game/vsCPU" element={<GameVsCPU />} />
        <Route path="/Connect-Four-Game/vsPlayer" element={<GameVsPlayer />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
