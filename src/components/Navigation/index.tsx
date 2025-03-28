import { device } from "@/styles/common";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <NavigationWrapper>
      <ul>
        <li onClick={() => navigate("/")}>메인</li>
        <li onClick={() => navigate("/setting")}>설정</li>
      </ul>
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  max-width: 1140px;
  margin: auto;
  ul {
    padding: 20px;
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    align-items: center;
    li {
      cursor: pointer;
      padding: 8px;
      color: #4e5968;
      border-radius: 8px;
      &:hover {
        background-color: #eee;
      }
    }
  }
  @media ${device.mobile} {
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    border-top: 1px solid #ddd;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
    ul {
      justify-content: flex-start;
    }
  }
`;
