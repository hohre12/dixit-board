import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../styles/common';
import { useRecoilValue } from 'recoil';
import { roundState } from '../../state/common';

const GameBoard = () => {
  const navigate = useNavigate();
  const round = useRecoilValue(roundState);
  return (
    <GameBoardWrapper>
      <h1>{round}회차 라운드 진행중</h1>
      <Button onClick={() => navigate('/scoreInput')}>라운드 종료</Button>
    </GameBoardWrapper>
  );
};

export default GameBoard;

const GameBoardWrapper = styled.div`
  text-align: center;
  padding: 50px;
  button {
    margin-top: 50px;
  }
`;
