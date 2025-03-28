import { device } from '@/styles/common';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <NavigationWrapper>
      <UlElement>
        <LiElement
          $isActive={location.pathname === '/'}
          onClick={() => navigate('/')}
        >
          메인
        </LiElement>
        <LiElement
          $isActive={location.pathname === '/setting'}
          onClick={() => navigate('/setting')}
        >
          설정
        </LiElement>
      </UlElement>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  max-width: 1140px;
  margin: auto;

  @media ${device.mobile} {
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    border-top: 1px solid #ddd;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
  }
`;

const UlElement = styled.ul`
  padding: 20px;
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: center;
  @media ${device.mobile} {
    justify-content: flex-start;
  }
`;
const LiElement = styled.li<{ $isActive: boolean }>`
  cursor: pointer;
  padding: 8px;
  color: #4e5968;
  border-radius: 8px;
  background-color: ${(props) => props.$isActive && '#eee'};
  &:hover {
    background-color: #ddd;
  }
`;
