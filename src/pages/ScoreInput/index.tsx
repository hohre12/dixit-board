import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  playersState,
  roundState,
  storyTellerIndexState,
} from '../../state/common';
import { ScoreType } from '../../constants/common';
import { Button } from '../../styles/common';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '@/hooks/useConfirm';

type TPlayerScore = {
  isCorrect: boolean;
  bonusScore: number;
};

const ScoreInput = () => {
  const navigate = useNavigate();
  const [round, setRound] = useRecoilState(roundState);
  const [players, setPlayers] = useRecoilState(playersState);
  const [storyTellerIndex, setStoryTellerIndex] = useRecoilState(
    storyTellerIndexState,
  );
  const [selectedScoreType, setSelectedScoreType] = useState<ScoreType>();
  const [playerScores, setPlayerScores] = useState<TPlayerScore[]>(
    players.map((_) => ({
      isCorrect: false,
      bonusScore: 0,
    })),
  );
  const { showConfirm, hideConfirm } = useConfirm();

  const checkCorrectPlayer = useCallback(
    (index: number, e: ChangeEvent<HTMLInputElement>) => {
      if (
        e.target.checked &&
        playerScores.filter((it) => it.isCorrect).length === players.length - 2
      ) {
        alert('모두다 정답일수 없습니다.');
        return;
      }
      if (e.target.checked) {
        setPlayerScores(
          playerScores.map((playerScore, idx) =>
            idx === index
              ? { bonusScore: 0, isCorrect: !playerScore.isCorrect }
              : { bonusScore: 0, isCorrect: playerScore.isCorrect },
          ),
        );
      } else {
        setPlayerScores(
          playerScores.map((playerScore, idx) =>
            idx === index
              ? { ...playerScore, isCorrect: !playerScore.isCorrect }
              : playerScore,
          ),
        );
      }
    },
    [playerScores, players.length],
  );
  const inputPlayerBonusScore = useCallback(
    (index: number, type: 'plus' | 'minus') => {
      // 모두 오답일경우, 추가 점수 limit 제한
      if (
        type === 'plus' &&
        selectedScoreType === ScoreType.ALL_WRONG &&
        playerScores.reduce(
          (acc, playerScore) => acc + playerScore.bonusScore,
          0,
        ) ===
          players.length - 1
      ) {
        alert(`최대 추가 점수는 ${players.length - 1}점을 넘을수 없습니다.`);
        return;
      }
      // 일부 정답일경우,
      if (
        type === 'plus' &&
        selectedScoreType === ScoreType.PARTLY_CORRECT &&
        playerScores.reduce(
          (acc, playerScore) => acc + playerScore.bonusScore,
          0,
        ) ===
          players.length -
            1 -
            playerScores.filter((playerScore) => playerScore.isCorrect).length
      ) {
        alert(
          `최대 추가 점수는 ${
            players.length -
            1 -
            playerScores.filter((playerScore) => playerScore.isCorrect).length
          }점을 넘을수 없습니다.`,
        );
        return;
      }
      if (type === 'plus') {
        setPlayerScores(
          playerScores.map((playerScore, idx) =>
            idx === index
              ? { ...playerScore, bonusScore: playerScore.bonusScore + 1 }
              : playerScore,
          ),
        );
      } else {
        setPlayerScores(
          playerScores.map((playerScore, idx) =>
            idx === index
              ? { ...playerScore, bonusScore: playerScore.bonusScore - 1 }
              : playerScore,
          ),
        );
      }
    },
    [playerScores, players.length, selectedScoreType],
  );

  const handleScoreSubmit = () => {
    if (!selectedScoreType) {
      alert('게임결과를 선택해주세요!');
      return;
    }
    switch (selectedScoreType) {
      case ScoreType.ALL_CORRECT:
        // 로직
        setPlayers(
          players.map((player, idx) =>
            idx === storyTellerIndex
              ? {
                  ...player,
                  scores: [...player.scores, 0],
                }
              : {
                  ...player,
                  scores: [...player.scores, 2],
                },
          ),
        );
        break;
      case ScoreType.ALL_WRONG:
        // 로직
        if (
          playerScores.reduce(
            (acc, playerScore) => acc + playerScore.bonusScore,
            0,
          ) !==
          players.length - 1
        ) {
          alert(
            `모두 오답일 경우, 추가 점수 총합이 ${players.length - 1}점 이여야 합니다.`,
          );
          return;
        }
        setPlayers(
          players.map((player, idx) =>
            idx === storyTellerIndex
              ? {
                  ...player,
                  scores: [...player.scores, 0],
                }
              : {
                  ...player,
                  scores: [...player.scores, 2 + playerScores[idx].bonusScore],
                },
          ),
        );
        break;
      case ScoreType.PARTLY_CORRECT:
        if (!playerScores.some((playerScore) => playerScore.isCorrect)) {
          alert('정답자는 최소 1명이여야 합니다.');
          return;
        }
        if (
          playerScores.reduce(
            (acc, playerScore) => acc + playerScore.bonusScore,
            0,
          ) <
          players.length -
            1 -
            playerScores.filter((playerScore) => playerScore.isCorrect).length
        ) {
          alert(
            `추가 점수는 최소 ${
              players.length -
              1 -
              playerScores.filter((playerScore) => playerScore.isCorrect).length
            }점이여야 합니다.`,
          );
          return;
        }
        setPlayers(
          players.map((player, idx) =>
            idx === storyTellerIndex || playerScores[idx].isCorrect
              ? {
                  ...player,
                  scores: [...player.scores, 3 + playerScores[idx].bonusScore],
                }
              : {
                  ...player,
                  scores: [...player.scores, 0 + playerScores[idx].bonusScore],
                },
          ),
        );
        break;
    }
    // 라운드 + 1
    setRound(round + 1);
    // 이야기꾼 + 1 - 마지막일시 처음으로
    if (storyTellerIndex === players.length - 1) {
      setStoryTellerIndex(0);
    } else {
      setStoryTellerIndex(storyTellerIndex + 1);
    }
    // 라운드 진행
    if (
      players.some(
        (player) => player.scores.reduce((acc, score) => acc + score, 0) >= 30,
      )
    ) {
      showConfirm({
        isOpen: true,
        title: '게임종료',
        content: `${players.find((player) => player.scores.reduce((acc, score) => acc + score, 0) >= 30)?.name}님이 ${30}점을 초과하여 게임이 종료되었습니다.`,
        cancelText: '취소',
        confirmText: '결과 페이지로 이동',
        confirmVariant: 'blue',
        onClose: hideConfirm,
        onCancel: hideConfirm,
        onConfirm: () => {
          hideConfirm();
          navigate('/gameResult');
        },
      });
    } else {
      navigate('/gameBoard');
    }
  };
  useEffect(() => {
    if (selectedScoreType === ScoreType.ALL_CORRECT) {
      setPlayerScores(
        players.map((_) => ({
          isCorrect: false,
          bonusScore: 0,
        })),
      );
    }
  }, [players, selectedScoreType]);
  return (
    <ScoreInputWrapper>
      <h2>{round} 라운드 점수 입력</h2>
      <ButtonWrapper>
        {Object.values(ScoreType).map((type, idx) => (
          <Button
            key={idx}
            onClick={() => setSelectedScoreType(type)}
          >
            {type}
          </Button>
        ))}
      </ButtonWrapper>
      {selectedScoreType === ScoreType.PARTLY_CORRECT && (
        <CheckWrapper>
          <h3>정답 맞춘 플레이어 선택</h3>
          {players.map(
            (player, idx) =>
              storyTellerIndex !== idx && (
                <div key={idx}>
                  <label htmlFor={`playerScore_${idx}`}>{player.name}</label>
                  <input
                    id={`playerScore_${idx}`}
                    type="checkbox"
                    checked={
                      playerScores.find(
                        (_, playerScoreIdx) => playerScoreIdx === idx,
                      )?.isCorrect
                    }
                    onChange={(e) => checkCorrectPlayer(idx, e)}
                  />
                </div>
              ),
          )}
        </CheckWrapper>
      )}
      {selectedScoreType && selectedScoreType !== ScoreType.ALL_CORRECT && (
        <InputWrapper>
          <h3>추가 점수 입력</h3>
          {players.map(
            (player, idx) =>
              storyTellerIndex !== idx && (
                <div key={idx}>
                  <span>{player.name}</span>
                  <Button onClick={() => inputPlayerBonusScore(idx, 'plus')}>
                    +
                  </Button>
                  <Button
                    onClick={() => {
                      if (playerScores[idx].bonusScore > 0) {
                        inputPlayerBonusScore(idx, 'minus');
                      }
                    }}
                  >
                    -
                  </Button>
                  <div>{`${playerScores[idx].bonusScore}점`}</div>
                </div>
              ),
          )}
        </InputWrapper>
      )}
      <Button
        $variant="black"
        onClick={handleScoreSubmit}
      >
        점수 입력 완료
      </Button>
      <Button onClick={() => console.log(players)}>(임시)확인</Button>
    </ScoreInputWrapper>
  );
};

export default ScoreInput;

const ScoreInputWrapper = styled.div`
  text-align: center;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > div {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    & > label {
      cursor: pointer;
    }
    & > input {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > div {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    & > div {
      border: 1px solid #ddd;
      padding: 10px 15px;
      border-radius: 5px;
    }
  }
`;
