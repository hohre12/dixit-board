import { atom } from "recoil";
import { TPlayer } from "../types";

// 플레이어 목록
export const playersState = atom<TPlayer[]>({
  key: "playersState",
  default: [
    { name: "", totalScore: 0, scores: [] },
    { name: "", totalScore: 0, scores: [] },
  ],
});

// 현재 라운드
export const roundState = atom<number>({
  key: "roundState",
  default: 1,
});

// 이야기꾼 인덱스
export const storytellerIndexState = atom<number>({
  key: "storytellerIndexState",
  default: 0,
});

// 게임 종료 여부
export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
});
