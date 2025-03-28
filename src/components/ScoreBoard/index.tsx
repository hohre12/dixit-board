import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { playersState, roundState } from "../../state/common";
import {
  device,
  TableFootRow,
  TableHeaderRow,
  TableItemRow,
  TableWrapper,
} from "../../styles/common";

const ScoreBoard = () => {
  const players = useRecoilValue(playersState);
  const round = useRecoilValue(roundState);
  return (
    <ScoreBoardWrapper>
      <TableWrapper>
        <thead>
          <TableHeaderRow>
            <th>이름</th>
            {players.map((player, idx) => (
              <th key={idx}>{player.name}</th>
            ))}
          </TableHeaderRow>
        </thead>
        <tbody>
          {Array.from({ length: round }).map((_, roundIdx) => (
            <TableItemRow key={roundIdx}>
              <td>{`${roundIdx + 1}회차`}</td>
              {players.map((player, playerIdx) => (
                <td key={playerIdx}>{`${player.scores[roundIdx] ?? 0}점`}</td>
              ))}
            </TableItemRow>
          ))}
        </tbody>
        <tfoot>
          <TableFootRow>
            <td>총점</td>
            {players.map((player, idx) => (
              <td key={idx}>
                {`${player.scores.reduce((acc, score) => acc + score, 0)}점`}
              </td>
            ))}
          </TableFootRow>
        </tfoot>
      </TableWrapper>
    </ScoreBoardWrapper>
  );
};

export default ScoreBoard;

const ScoreBoardWrapper = styled.div`
  padding: 30px 0;
  max-width: 1140px;
  margin: auto;
  height: 500px;
  overflow-y: auto;
  @media ${device.mobile} {
    height: 400px;
  }
`;
