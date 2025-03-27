import { useState } from "react";
import "./App.css";
import { Navigate, Routes as ReactRouterRoutes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Start from "./pages/Start";
import GameBoard from "./pages/GameBoard";

function App() {
  return (
    <div className="App">
      <ReactRouterRoutes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/start" element={<Start />} />
        <Route path="/gameBoard" element={<GameBoard />} />
      </ReactRouterRoutes>
    </div>
  );
}

export default App;
