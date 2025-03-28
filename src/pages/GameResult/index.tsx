import { defaultGameScoreState, playersState } from '@/state/common';
import { TableItemRow, TableWrapper } from '@/styles/common';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const GameResult = () => {
  const players = useRecoilValue(playersState);
  const defaultGameScore = useRecoilValue(defaultGameScoreState);
  const winnerPlayers = players.filter(
    (player) =>
      player.scores.reduce((acc, score) => acc + score, 0) >=
      defaultGameScore.maxScore,
  );
  const sortedPlayers = [...players].sort(
    (a, b) =>
      b.scores.reduce((acc, score) => acc + score, 0) -
      a.scores.reduce((acc, score) => acc + score, 0),
  );

  return (
    <GameResultWrapper>
      <ResultWrapper>
        <h1>게임 결과</h1>
        <h2>
          우승자 :{' '}
          {winnerPlayers
            .map(
              (winnerPlayer) =>
                `${winnerPlayer.name}님! (${winnerPlayer.scores.reduce((acc, score) => acc + score, 0)}점)`,
            )
            .join(', ')}
        </h2>
        <TableWrapper>
          <thead>
            <th>순위</th>
            <th>플레이어</th>
            <th>최종 점수</th>
          </thead>
          <tbody>
            {sortedPlayers.map((player, idx) => (
              <TableItemRow key={idx}>
                <td>{`${idx + 1}위`}</td>
                <td>{`${player.name}님`}</td>
                <td>{`${player.scores.reduce((acc, score) => acc + score, 0)}점`}</td>
              </TableItemRow>
            ))}
          </tbody>
        </TableWrapper>
      </ResultWrapper>
    </GameResultWrapper>
  );
};

export default GameResult;

const GameResultWrapper = styled.div``;
const ResultWrapper = styled.div`
  padding: 50px;
`;
