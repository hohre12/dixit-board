import { ReactNode } from 'react';

export type TVariant = 'gray' | 'black' | 'blue' | 'red';

export type TPlayer = {
  name: string;
  scores: number[];
};

export type TDefaultGameScore = {
  maxScore: number; // 게임 승리 조건 점수
  bonusScore: number; // 본인이 추측한 카드판 위에 올려져있는 숫자판 당 보너스 점수
  scoreAllCorrect: number; // 모두 정답 시 점수
  scoreAllWrong: number; // 모두 오답 시 점수
  scorePartlyCorrect: number; // 일부 정답 시 점수
};

export type TConfirm = {
  isOpen: boolean;
  title?: string;
  content?: string;
  onCancel?: () => void;
  cancelText?: string;
  onConfirm?: (val: string) => void;
  confirmText?: string;
  onClose?: () => void;
  confirmVariant?: TVariant;
};

export type TToast = {
  id: number;
  isImage: boolean;
  imgUrl?: string;
  title?: string;
  content: string;
  type: 'warning' | 'success' | 'error';
  children?: ReactNode;
};
