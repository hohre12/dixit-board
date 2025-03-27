import { useState } from "react";
import "./App.css";
import {
  Navigate,
  Routes as ReactRouterRoutes,
  Route,
  useLocation,
} from "react-router-dom";
import Main from "./pages/Main";
import Start from "./pages/Start";
import GameBoard from "./pages/GameBoard";
import StoryTellerInfo from "./components/StoryTellerInfo";

function App() {
  const location = useLocation();
  const isGameInProgress = ["/gameBoard"].includes(location.pathname);
  return (
    <div className="App">
      {isGameInProgress && <StoryTellerInfo />}
      <ReactRouterRoutes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/start" element={<Start />} />
        <Route path="/gameBoard" element={<GameBoard />} />
      </ReactRouterRoutes>
    </div>
  );
}

export default App;
