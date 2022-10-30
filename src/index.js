import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Menu } from "./components/menu/Menu";
import { Rules } from "./components/rules/Rules";
import { Game } from "./components/game/Game";
import { GameVsCPU } from "./components/game/vsCPU/GamevsCPU";
import { GameVsPlayer } from "./components/game/vsPlayer/GamevsPlayer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Menu />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/vsCPU" element={<GameVsCPU />} />
        <Route path="/vsPlayer" element={<GameVsPlayer />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
