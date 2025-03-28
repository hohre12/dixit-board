import { useConfirm } from '@/hooks/useConfirm';
import { defaultGameScoreState } from '@/state/common';
import { Button, device } from '@/styles/common';
import { TDefaultGameScore } from '@/types';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

const Setting = () => {
  const navigate = useNavigate();
  const { showConfirm, hideConfirm } = useConfirm();
  const [defaultGameScore, setDefaultGameScore] = useRecoilState(
    defaultGameScoreState,
  );
  const resetDefaultGameScore = useResetRecoilState(defaultGameScoreState);
  const [gameScore, setGameScore] =
    useState<TDefaultGameScore>(defaultGameScore);
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>, key: keyof TDefaultGameScore) => {
      const value = Number(e.target.value);
      if (!isNaN(value)) {
        setGameScore((prevState) => ({ ...prevState, [key]: value }));
      }
    },
    [setGameScore],
  );

  useEffect(() => {
    if (defaultGameScore) {
      setGameScore(defaultGameScore);
    }
  }, [defaultGameScore]);
  return (
    <SettingWrapper>
      <BoxWrapper>
        <h2>게임 설정</h2>
        <InputWrapper>
          <InputBox>
            <span>기본 승리 조건 점수</span>
            <input
              type="number"
              value={gameScore.maxScore}
              min={1}
              onChange={(e) => handleInput(e, 'maxScore')}
            />
          </InputBox>
          <InputBox>
            <span>보너스 점수</span>
            <input
              type="number"
              value={gameScore.bonusScore}
              min={0}
              onChange={(e) => handleInput(e, 'bonusScore')}
            />
          </InputBox>
          <InputBox>
            <span>모두 정답 점수</span>
            <input
              type="number"
              value={gameScore.scoreAllCorrect}
              min={0}
              onChange={(e) => handleInput(e, 'scoreAllCorrect')}
            />
          </InputBox>
          <InputBox>
            <span>모두 오답 점수</span>
            <input
              type="number"
              value={gameScore.scoreAllWrong}
              min={0}
              onChange={(e) => handleInput(e, 'scoreAllWrong')}
            />
          </InputBox>
          <InputBox>
            <span>일부 정답자 점수</span>
            <input
              type="number"
              value={gameScore.scorePartlyCorrect}
              min={0}
              onChange={(e) => handleInput(e, 'scorePartlyCorrect')}
            />
          </InputBox>
        </InputWrapper>
        <Button
          $variant="blue"
          onClick={() =>
            showConfirm({
              isOpen: true,
              title: '저장',
              content: `승리 조건 점수 및 획득 점수를 저장하시겠습니까?`,
              cancelText: '취소',
              confirmText: '저장',
              confirmVariant: 'blue',
              onClose: hideConfirm,
              onCancel: hideConfirm,
              onConfirm: () => {
                setDefaultGameScore(gameScore);
                hideConfirm();
                navigate(-1);
              },
            })
          }
        >
          저장
        </Button>
        <Button
          $variant="red"
          onClick={() =>
            showConfirm({
              isOpen: true,
              title: '초기화',
              content: `프로그램 세팅을 초기화 하시겠습니까?`,
              cancelText: '취소',
              confirmText: '초기화',
              confirmVariant: 'red',
              onClose: hideConfirm,
              onCancel: hideConfirm,
              onConfirm: () => {
                resetDefaultGameScore();
                hideConfirm();
              },
            })
          }
        >
          프로그램 셋팅 초기화
        </Button>
      </BoxWrapper>
    </SettingWrapper>
  );
};

export default Setting;

const SettingWrapper = styled.div`
  padding: 30px;
  @media ${device.mobile} {
    padding: 0;
  }
`;
const BoxWrapper = styled.div`
  padding: 20px;
  width: 500px;
  max-height: 700px;
  border-radius: 10px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  margin: auto;
  h2 {
    text-align: center;
  }
  @media ${device.mobile} {
    width: 100%;
    max-height: 700px;
    border: none;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputBox = styled.div`
  display: flex;
  min-height: 50px;
  padding: 15px 0px;
  align-items: center;
  justify-content: space-between;
  span {
    text-align: left;
    width: 150px;
  }
  input {
    width: 200px;
    padding: 5px 13px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
`;
