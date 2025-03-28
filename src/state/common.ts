import { atom } from 'recoil';
import { TConfirm, TDefaultGameScore, TPlayer, TToast } from '../types';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'players',
  storage: localStorage,
});

// 플레이어 목록
export const playersState = atom<TPlayer[]>({
  key: 'playersState',
  default: [
    { name: '', scores: [] },
    { name: '', scores: [] },
    { name: '', scores: [] },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const defaultGameScoreState = atom<TDefaultGameScore>({
  key: 'defaultGameScoreState',
  default: {
    maxScore: 30, // 기본 승리 조건 점수
    bonusScore: 1, // 본인이 추측한 카드판 위에 올려져있는 숫자판 당 보너스 점수
    scoreAllCorrect: 2, // 기본 모두 정답 점수
    scoreAllWrong: 2, // 기본 모두 오답 점수
    scorePartlyCorrect: 3, // 기본 일부 정답 점수
  },
  effects_UNSTABLE: [persistAtom],
});

// 현재 라운드
export const roundState = atom<number>({
  key: 'roundState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

// 이야기꾼 인덱스
export const storyTellerIndexState = atom<number>({
  key: 'storyTellerIndexState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const confirmState = atom<TConfirm>({
  key: 'confirmState',
  default: {
    isOpen: false,
    confirmVariant: 'gray',
  },
});

export const toastListState = atom<TToast[]>({
  key: 'toastListState',
  default: [],
});
