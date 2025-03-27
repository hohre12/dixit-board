import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  playersState,
  roundState,
  storyTellerIndexState,
} from '../../state/common';

const StoryTellerInfo = () => {
  const storyTellerIndex = useRecoilValue(storyTellerIndexState);
  const players = useRecoilValue(playersState);
  const round = useRecoilValue(roundState);
  return (
    <StoryTellerInfoWrapper>
      <span>{`${round}회차 StoryTeller : ${players[storyTellerIndex].name}님`}</span>
    </StoryTellerInfoWrapper>
  );
};

export default StoryTellerInfo;

const StoryTellerInfoWrapper = styled.div`
  width: 100%;
  padding: 30px;
  text-align: center;
  span {
    font-size: 28px;
    font-weight: 700;
  }
`;
