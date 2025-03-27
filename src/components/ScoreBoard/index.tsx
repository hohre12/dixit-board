import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  playersState,
  roundState,
  storytellerIndexState,
} from "../../state/common";
import {
  TableHeaderRow,
  TableItemRow,
  TableWrapper,
} from "../../styles/common";

const ScoreBoard = () => {
  const players = useRecoilValue(playersState);

  return (
    <ScoreBoardWrapper>
      <TableWrapper>
        <thead>
          <TableHeaderRow>
            <th>이름</th>
            <th>점수</th>
            <th></th>
          </TableHeaderRow>
        </thead>
        <tbody>
          <TableItemRow>
            <td></td>
          </TableItemRow>
        </tbody>
      </TableWrapper>
    </ScoreBoardWrapper>
  );
};

export default ScoreBoard;

const ScoreBoardWrapper = styled.div`
  width: 100%;
`;
