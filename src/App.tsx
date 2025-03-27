import './App.css';
import {
  Routes as ReactRouterRoutes,
  Route,
  useLocation,
} from 'react-router-dom';
import Main from './pages/Main';
import Start from './pages/Start';
import GameBoard from './pages/GameBoard';
import StoryTellerInfo from './components/StoryTellerInfo';
import ScoreBoard from './components/ScoreBoard';
import ScoreInput from './pages/ScoreInput';
import GameResult from './pages/GameResult';
import Confirm from './components/Confirm';

function App() {
  const location = useLocation();
  const isGameInProgress = ['/gameBoard', '/scoreInput'].includes(
    location.pathname,
  );
  return (
    <div className="App">
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
        />
        <Route
          path="/scoreInput"
          element={<ScoreInput />}
        />
        <Route
          path="/gameResult"
          element={<GameResult />}
        />
      </ReactRouterRoutes>
      <Confirm></Confirm>
    </div>
  );
}

export default App;
