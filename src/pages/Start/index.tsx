import styled from 'styled-components';
import { Button, Input } from '../../styles/common';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { playersState } from '../../state/common';
import { MAXIMUM_PLAYERS } from '../../constants/common';
import { useCallback } from 'react';

const Start = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useRecoilState(playersState);

  const addPlayer = () => {
    if (players.length < MAXIMUM_PLAYERS) {
      setPlayers((prev) => [...prev, { name: '', scores: [] }]);
    } else {
      alert(`플레이어 수는 최대 ${MAXIMUM_PLAYERS}명 입니다.`);
    }
  };

  const removePlayer = () => {
    if (players.length > 3) {
      setPlayers((prev) => prev.slice(0, -1));
    } else {
      alert(`플레이어 수는 최소 3명 입니다.`);
    }
  };

  const handlePlayersNameChange = useCallback(
    (index: number, name: string) => {
      setPlayers((prevState) =>
        prevState.map((player, i) =>
          i === index ? { ...player, name } : player,
        ),
      );
    },
    [setPlayers],
  );

  const handleStart = () => {
    if (players.some((it) => !it.name)) {
      alert('플레이어 이름은 필수입니다.');
      return;
    }
    navigate('/gameBoard');
  };

  return (
    <StartWrapper>
      <h2>플레이어 설정</h2>
      <div>현재 플레이어 수 {players.length}명</div>
      <ButtonWrapper>
        <Button onClick={addPlayer}>플레이어 추가</Button>
        <Button onClick={removePlayer}>플레이어 삭제</Button>
      </ButtonWrapper>
      {players.map((it, idx) => (
        <PlayerBox key={idx}>
          <Input
            value={it.name}
            onChange={(e) => handlePlayersNameChange(idx, e.target.value)}
          ></Input>
        </PlayerBox>
      ))}
      <Button onClick={handleStart}>입력 완료 및 게임 Start!</Button>
    </StartWrapper>
  );
};

export default Start;

const StartWrapper = styled.div``;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const PlayerBox = styled.div`
  padding: 10px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #eee;
`;
