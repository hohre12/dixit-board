import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  playersState,
  roundState,
  storytellerIndexState,
} from "../../state/common";

const StoryTellerInfo = () => {
  const storytellerIndex = useRecoilValue(storytellerIndexState);
  const players = useRecoilValue(playersState);
  const round = useRecoilValue(roundState);
  return (
    <StoryTellerInfoWrapper>
      <h3>{`${round}회차 이야기꾼 : ${players[storytellerIndex].name}`}</h3>
    </StoryTellerInfoWrapper>
  );
};

export default StoryTellerInfo;

const StoryTellerInfoWrapper = styled.div`
  width: 100%;
`;
