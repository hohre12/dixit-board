import './App.css';
import {
  Routes as ReactRouterRoutes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Main from './pages/Main';
import Start from './pages/Start';
import GameBoard from './pages/GameBoard';
import StoryTellerInfo from './components/StoryTellerInfo';
import ScoreBoard from './components/ScoreBoard';
import ScoreInput from './pages/ScoreInput';
import GameResult from './pages/GameResult';
import Confirm from './components/Confirm';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  defaultGameScoreState,
  playersState,
  roundState,
  storyTellerIndexState,
} from './state/common';
import { useConfirm } from './hooks/useConfirm';
import Navigation from './components/Navigation';
import Toast from './components/Toast';
import Setting from './pages/Setting';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const players = useRecoilValue(playersState);
  const resetPlayers = useResetRecoilState(playersState);
  const resetRound = useResetRecoilState(roundState);
  const resetStoryTellerIndex = useResetRecoilState(storyTellerIndexState);
  const defaultGameScore = useRecoilValue(defaultGameScoreState);
  const { showConfirm, hideConfirm } = useConfirm();
  const isGameInProgress = ['/gameBoard', '/scoreInput'].includes(
    location.pathname,
  );
  const winnerPlayers = players.filter(
    (player) =>
      player.scores.reduce((acc, score) => acc + score, 0) >=
      defaultGameScore.maxScore,
  );
  const openConfirm = useCallback(() => {
    showConfirm({
      isOpen: true,
      title: '게임종료',
      content: `${winnerPlayers.map((player) => player.name).join(',')}님이 ${defaultGameScore.maxScore}점을 초과하여 게임이 종료되었습니다.`,
      confirmText: '결과 페이지로 이동',
      confirmVariant: 'blue',
      onClose: () => {
        hideConfirm();
        navigate('/gameResult');
      },
      onConfirm: () => {
        hideConfirm();
        navigate('/gameResult');
      },
    });
  }, [
    defaultGameScore.maxScore,
    hideConfirm,
    navigate,
    showConfirm,
    winnerPlayers,
  ]);
  useEffect(() => {
    if (winnerPlayers.length > 0) {
      resetPlayers();
      resetRound();
      resetStoryTellerIndex();
      openConfirm();
    }
  }, [
    openConfirm,
    resetPlayers,
    resetRound,
    resetStoryTellerIndex,
    winnerPlayers,
  ]);
  return (
    <div className="App">
      <Navigation />
      {isGameInProgress && <ScoreBoard />}
      {isGameInProgress && <StoryTellerInfo />}
      <ReactRouterRoutes>
        <Route
          path="/"
          element={<Main></Main>}
        />
        <Route
          path="/start"
          element={<Start />}
        />
        <Route
          path="/gameBoard"
          element={<GameBoard />}
        ></Route>
        <Route
          path="/scoreInput"
          element={<ScoreInput />}
        ></Route>
        <Route
          path="/gameResult"
          element={<GameResult />}
        />
        <Route
          path="/setting"
          element={<Setting />}
        />
      </ReactRouterRoutes>
      <Confirm></Confirm>
      <Toast></Toast>
    </div>
  );
}

export default App;
