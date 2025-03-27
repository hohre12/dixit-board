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
