import { useRecoilValue } from 'recoil';
import { toastListState } from '@/state/common';
import { SvgIcon } from '../SvgIcon';
import styled from 'styled-components';
import { device } from '@/styles/common';

const Toast = () => {
  const toastList = useRecoilValue(toastListState);

  return (
    <ToastListWrapper>
      {toastList.map((it, idx) => (
        <ToastWrapper key={idx}>
          {it.isImage && (
            <SvgIcon
              iconName={it.imgUrl ? it.imgUrl : `icon-toast-${it.type}`}
              alt={`img_${idx}`}
            />
          )}
          <ToastText>
            <h4>{it.title}</h4>
            <p>{it.content}</p>
          </ToastText>
          {it.children}
        </ToastWrapper>
      ))}
    </ToastListWrapper>
  );
};

export default Toast;

const ToastListWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 40%;
  z-index: 999999 !important;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media ${device.mobile} {
    transform: translate(35%, 0);
  }
`;
const ToastWrapper = styled.div`
  color: #fff;
  text-align: left;
  display: flex;
  padding: 9px 12px;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: #333;
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.25);
`;
const ToastText = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }
`;
