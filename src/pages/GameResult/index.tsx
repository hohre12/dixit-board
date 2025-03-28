import styled from 'styled-components';

const GameResult = () => {
  return (
    <GameResultWrapper>
      <ResultWrapper>게임 끝이요</ResultWrapper>
    </GameResultWrapper>
  );
};

export default GameResult;

const GameResultWrapper = styled.div``;
const ResultWrapper = styled.div`
  padding: 50px;
`;
