import styled from "styled-components";
import { Button, device } from "../../styles/common";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import {
  playersState,
  roundState,
  storyTellerIndexState,
} from "../../state/common";
import { useEffect } from "react";

const Main = () => {
  const navigate = useNavigate();
  const resetPlayers = useResetRecoilState(playersState);
  const resetRound = useResetRecoilState(roundState);
  const resetStoryTellerIndex = useResetRecoilState(storyTellerIndexState);
  useEffect(() => {
    resetPlayers();
    resetRound();
    resetStoryTellerIndex();
  }, [resetPlayers, resetRound, resetStoryTellerIndex]);
  return (
    <MainWrapper>
      <h1>Dixit ScoreBoard</h1>
      <Button onClick={() => navigate("/start")}>게임 시작</Button>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  width: 450px;
  height: 600px;
  transform: translate(0, 50%);
  margin: auto;
  text-align: center;
  h1 {
    margin-bottom: 30px;
  }

  @media ${device.mobile} {
    width: 100%;
  }
`;
