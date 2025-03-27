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
      <h3>{`${round}회차 이야기꾼 : ${players[storyTellerIndex].name}님`}</h3>
    </StoryTellerInfoWrapper>
  );
};

export default StoryTellerInfo;

const StoryTellerInfoWrapper = styled.div`
  width: 100%;
`;
