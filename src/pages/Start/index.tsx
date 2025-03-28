import styled from "styled-components";
import { Button, device, Input } from "../../styles/common";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { playersState } from "../../state/common";
import { MAXIMUM_PLAYERS } from "../../constants/common";
import { useCallback } from "react";

const Start = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useRecoilState(playersState);

  const addPlayer = () => {
    if (players.length < MAXIMUM_PLAYERS) {
      setPlayers((prev) => [...prev, { name: "", scores: [] }]);
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
      alert("플레이어 이름은 필수입니다.");
      return;
    }
    navigate("/gameBoard");
  };

  return (
    <StartWrapper>
      <PlayerSettingWrapper>
        <h2>플레이어 설정</h2>
        <div>현재 플레이어 수 {players.length}명</div>
        <ButtonWrapper>
          <Button onClick={addPlayer}>플레이어 추가</Button>
          <Button onClick={removePlayer}>플레이어 삭제</Button>
        </ButtonWrapper>
        {players.map((it, idx) => (
          <PlayerBox key={idx}>
            <span>
              플레이어 {idx + 1}
              <p className="required">*</p>
            </span>
            <Input
              value={it.name}
              onChange={(e) => handlePlayersNameChange(idx, e.target.value)}
            ></Input>
          </PlayerBox>
        ))}
        <Button $variant="blue" onClick={handleStart}>
          게임 Start!
        </Button>
      </PlayerSettingWrapper>
    </StartWrapper>
  );
};

export default Start;

const StartWrapper = styled.div`
  padding: 30px;
  @media ${device.mobile} {
    padding: 0;
  }
`;
const PlayerSettingWrapper = styled.div`
  padding: 20px;
  width: 500px;
  max-height: 700px;
  border-radius: 10px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  h2 {
    text-align: center;
  }
  @media ${device.mobile} {
    width: 100%;
    max-height: 700px;
    border: none;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: auto;
`;
const PlayerBox = styled.div`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #eee;
  display: flex;
  gap: 20px;
  align-items: center;
  span {
    white-space: nowrap;
  }
  input {
    border: 1px solid #eee;
    border-radius: 5px;
    height: 30px;
  }
`;
