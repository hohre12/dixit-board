import { atom } from 'recoil';
import { TConfirm, TPlayer } from '../types';
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
