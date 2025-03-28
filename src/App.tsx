import "./App.css";
import {
  Routes as ReactRouterRoutes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Main from "./pages/Main";
import Start from "./pages/Start";
import GameBoard from "./pages/GameBoard";
import StoryTellerInfo from "./components/StoryTellerInfo";
import ScoreBoard from "./components/ScoreBoard";
import ScoreInput from "./pages/ScoreInput";
import GameResult from "./pages/GameResult";
import Confirm from "./components/Confirm";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  playersState,
  roundState,
  storyTellerIndexState,
} from "./state/common";
import { useConfirm } from "./hooks/useConfirm";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const players = useRecoilValue(playersState);
  const resetPlayers = useResetRecoilState(playersState);
  const resetRound = useResetRecoilState(roundState);
  const resetStoryTellerIndex = useResetRecoilState(storyTellerIndexState);
  const { showConfirm, hideConfirm } = useConfirm();
  const isGameInProgress = ["/gameBoard", "/scoreInput"].includes(
    location.pathname,
  );
  useEffect(() => {
    const winnerPlayers = players.filter(
      (player) => player.scores.reduce((acc, score) => acc + score, 0) >= 30,
    );
    if (winnerPlayers.length > 0) {
      resetPlayers();
      resetRound();
      resetStoryTellerIndex();
      showConfirm({
        isOpen: true,
        title: "게임종료",
        content: `${winnerPlayers.map((player) => player.name).join(",")}님이 30점을 초과하여 게임이 종료되었습니다.`,
        confirmText: "결과 페이지로 이동",
        confirmVariant: "blue",
        onClose: () => {
          hideConfirm();
          navigate("/gameResult");
        },
        onConfirm: () => {
          hideConfirm();
          navigate("/gameResult");
        },
      });
    }
  }, [players, resetPlayers, resetRound, resetStoryTellerIndex, showConfirm]);
  return (
    <div className="App">
      {isGameInProgress && <ScoreBoard />}
      {isGameInProgress && <StoryTellerInfo />}
      <ReactRouterRoutes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/start" element={<Start />} />
        <Route path="/gameBoard" element={<GameBoard />} />
        <Route path="/scoreInput" element={<ScoreInput />} />
        <Route path="/gameResult" element={<GameResult />} />
      </ReactRouterRoutes>
      <Confirm></Confirm>
    </div>
  );
}

export default App;
