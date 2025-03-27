import styled from 'styled-components';
import { Button } from '../../styles/common';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { playersState } from '../../state/common';
import { useEffect } from 'react';

const Main = () => {
  const navigate = useNavigate();
  const resetPlayers = useResetRecoilState(playersState);
  useEffect(() => {
    resetPlayers();
  }, [resetPlayers]);
  return (
    <MainWrapper>
      <h1>Dixit ScoreBoard</h1>
      <Button onClick={() => navigate('/start')}>게임 시작</Button>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  width: 450px;
  height: 600px;
  padding-top: 25%;
  margin: auto;
  text-align: center;
  h1 {
    margin-bottom: 30px;
  }
`;
