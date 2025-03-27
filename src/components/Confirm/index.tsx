import { Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { confirmState } from '@/state/common';
import { SvgIcon } from '../SvgIcon';
import { Button, device } from '@/styles/common';
import styled from 'styled-components';

const Confirm = () => {
  const {
    isOpen,
    title,
    content,
    onCancel,
    cancelText,
    onConfirm,
    confirmText,
    onClose,
    confirmVariant,
    ...props
  } = useRecoilValue(confirmState);
  const [text, setText] = useState<string>('');

  const formattedContent =
    content &&
    content.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
  if (!isOpen) return null;
  return (
    <OverlayStyle {...props}>
      <ConfirmWrapper>
        <ConfirmHeader>
          <h1>{title}</h1>
          <SvgIcon
            iconName="icon-close"
            alt="close"
            onClick={onClose}
          />
        </ConfirmHeader>
        {content && (
          <ConfirmContent>
            <p>{formattedContent}</p>
          </ConfirmContent>
        )}
        <ConfirmFooter>
          {cancelText && <Button onClick={onCancel}>{cancelText}</Button>}
          {confirmText && onConfirm && (
            <Button
              $variant={confirmVariant}
              onClick={() => {
                onConfirm(text);
                setText('');
              }}
            >
              {confirmText}
            </Button>
          )}
        </ConfirmFooter>
      </ConfirmWrapper>
    </OverlayStyle>
  );
};

export default Confirm;

const OverlayStyle = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  height: 100%;
  overflow-y: auto;
`;
const ConfirmWrapper = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  z-index: 1001;
  width: 460px;
  min-height: 110px;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 1px 2px 16px 0px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media ${device.mobile} {
    width: 90%;
  }
`;
const ConfirmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 18px;
    font-weight: 700;
  }
  svg {
    cursor: pointer;
  }
`;
const ConfirmContent = styled.div`
  p {
    font-size: 14px;
    font-weight: 400;
  }
`;
const ConfirmFooter = styled.div`
  button {
    font-size: 14px;
    font-weight: 500;
  }
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-left: auto;
`;
