import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  defaultGameScoreState,
  playersState,
  roundState,
  storyTellerIndexState,
} from '../../state/common';
import { ScoreType } from '../../constants/common';
import { Button } from '../../styles/common';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TPlayer } from '@/types';
import { useToast } from '@/hooks/useToast';
import { useConfirm } from '@/hooks/useConfirm';

type TPlayerScore = {
  isCorrect: boolean;
  bonusScore: number;
};

const ScoreInput = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { showConfirm, hideConfirm } = useConfirm();
  const defaultGameScore = useRecoilValue(defaultGameScoreState);
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

  const openConfirm = useCallback(
    (winnerPlayers: TPlayer[]) => {
      showConfirm({
        isOpen: true,
        title: '게임종료',
        content: `${winnerPlayers.map((player) => player.name).join(',')}님이 ${defaultGameScore.maxScore}점을 초과하여 게임이 종료되었습니다.`,
        confirmText: '결과 페이지로 이동',
        confirmVariant: 'blue',
        onClose: () => {
          hideConfirm();
          navigate('/gameResult');
        },
        onConfirm: () => {
          hideConfirm();
          navigate('/gameResult');
        },
      });
    },
    [defaultGameScore.maxScore, hideConfirm, navigate, showConfirm],
  );

  const checkCorrectPlayer = useCallback(
    (index: number, e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      const correctCount = playerScores.filter((it) => it.isCorrect).length;
      if (isChecked && correctCount >= players.length - 2) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `모두다 정답일수 없습니다.`,
          type: 'error',
        });
        return;
      }
      setPlayerScores((prevScores) =>
        prevScores.map((playerScore, idx) => {
          const isTarget = idx === index;
          return {
            ...playerScore,
            isCorrect: isTarget
              ? !playerScore.isCorrect
              : playerScore.isCorrect,
            bonusScore: isChecked ? 0 : playerScore.bonusScore,
          };
        }),
      );
    },
    [addToast, playerScores, players.length],
  );
  const inputPlayerBonusScore = useCallback(
    (index: number, type: 'plus' | 'minus') => {
      const totalBonusScore = playerScores.reduce(
        (acc, { bonusScore }) => acc + bonusScore,
        0,
      );
      const correctCount = playerScores.filter(
        ({ isCorrect }) => isCorrect,
      ).length;
      const maxBonusLimit =
        players.length * defaultGameScore.bonusScore -
        defaultGameScore.bonusScore -
        (selectedScoreType === ScoreType.PARTLY_CORRECT
          ? correctCount * defaultGameScore.bonusScore
          : 0);

      if (type === 'plus' && totalBonusScore === maxBonusLimit) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `최대 추가 점수는 ${maxBonusLimit}점을 넘을 수 없습니다.`,
          type: 'error',
        });
        return;
      }

      setPlayerScores((prevScores) =>
        prevScores.map((playerScore, idx) => ({
          ...playerScore,
          bonusScore:
            idx === index
              ? playerScore.bonusScore +
                (type === 'plus'
                  ? defaultGameScore.bonusScore
                  : -defaultGameScore.bonusScore)
              : playerScore.bonusScore,
        })),
      );
    },
    [
      addToast,
      defaultGameScore.bonusScore,
      playerScores,
      players.length,
      selectedScoreType,
    ],
  );

  const handleScoreSubmit = () => {
    if (!selectedScoreType) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: `게임결과를 선택해주세요!`,
        type: 'error',
      });
      return;
    }

    const totalBonusScore = playerScores.reduce(
      (acc, { bonusScore }) => acc + bonusScore,
      0,
    );
    const correctCount = playerScores.filter(
      ({ isCorrect }) => isCorrect,
    ).length;
    const minBonusRequired =
      players.length * defaultGameScore.bonusScore -
      defaultGameScore.bonusScore -
      correctCount * defaultGameScore.bonusScore;

    const getUpdatedScores = (player: TPlayer, idx: number): number[] => {
      if (
        selectedScoreType !== ScoreType.PARTLY_CORRECT &&
        idx === storyTellerIndex
      )
        return [...player.scores, 0];

      switch (selectedScoreType) {
        case ScoreType.ALL_CORRECT:
          return [...player.scores, defaultGameScore.scoreAllCorrect];
        case ScoreType.ALL_WRONG:
          return [
            ...player.scores,
            defaultGameScore.scoreAllWrong + playerScores[idx].bonusScore,
          ];
        case ScoreType.PARTLY_CORRECT:
          return [
            ...player.scores,
            idx === storyTellerIndex || playerScores[idx].isCorrect
              ? defaultGameScore.scorePartlyCorrect +
                playerScores[idx].bonusScore
              : playerScores[idx].bonusScore,
          ];
        default:
          return player.scores;
      }
    };

    if (
      selectedScoreType === ScoreType.ALL_WRONG &&
      totalBonusScore !==
        players.length * defaultGameScore.bonusScore -
          defaultGameScore.bonusScore
    ) {
      addToast({
        id: Date.now(),
        isImage: true,
        content: `모두 오답일 경우, 추가 점수 총합이 ${players.length * defaultGameScore.bonusScore - defaultGameScore.bonusScore}점 이여야 합니다.`,
        type: 'error',
      });
      return;
    }

    if (selectedScoreType === ScoreType.PARTLY_CORRECT) {
      if (!correctCount) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `정답자는 최소 1명이여야 합니다`,
          type: 'error',
        });
        return;
      }
      if (totalBonusScore < minBonusRequired) {
        addToast({
          id: Date.now(),
          isImage: true,
          content: `추가 점수는 최소 ${minBonusRequired}점이여야 합니다.`,
          type: 'error',
        });
        return;
      }
    }

    const settingPlayers = players.map((player, idx) => ({
      ...player,
      scores: getUpdatedScores(player, idx),
    }));
    const winnerPlayers = settingPlayers.filter(
      (player) =>
        player.scores.reduce((acc, score) => acc + score, 0) >=
        defaultGameScore.maxScore,
    );
    setPlayers(settingPlayers);
    if (winnerPlayers.length > 0) {
      openConfirm(winnerPlayers);
      window.history.pushState(null, '', '/');
    } else {
      setRound((prev) => prev + 1);
      setStoryTellerIndex((prev) =>
        prev === players.length - 1 ? 0 : prev + 1,
      );
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
            $variant={selectedScoreType === type ? 'black' : undefined}
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
        $variant="blue"
        onClick={handleScoreSubmit}
      >
        점수 입력 완료
      </Button>
    </ScoreInputWrapper>
  );
};

export default ScoreInput;

const ScoreInputWrapper = styled.div`
  text-align: center;
  padding: 50px 50px 120px 50px;
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
