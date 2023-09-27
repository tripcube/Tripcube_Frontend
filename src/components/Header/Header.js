import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%" }}>
      <HeaderStyle>
        <img
          src={require("../../images/delete.svg").default}
          alt="delete"
          onClick={() => navigate("/home")}
        />

        <div style={{ marginLeft: "8px" }}>{children}</div>
      </HeaderStyle>
    </div>
  );
};

export default Header;

export const HeaderStyle = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 18px;
  font-size: 15px;
  font-weight: 600;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: var(--color-white);
`;
