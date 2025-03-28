import { ReactNode } from 'react';

export type TVariant = 'gray' | 'black' | 'blue' | 'red';

export type TPlayer = {
  name: string;
  scores: number[];
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
