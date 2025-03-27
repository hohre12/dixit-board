import { atom } from 'recoil';
import { TPlayer } from '../types';
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

// 현재 라운드
export const roundState = atom<number>({
  key: 'roundState',
  default: 1,
});

// 이야기꾼 인덱스
export const storyTellerIndexState = atom<number>({
  key: 'storyTellerIndexState',
  default: 0,
});

// 게임 종료 여부
export const gameOverState = atom<boolean>({
  key: 'gameOverState',
  default: false,
});
