import backbutton from "@svgs/left-arrow.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 20px;
  height: 20px;
  background-image: url("${backbutton}");
  background-size: 20px 20px;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`;

const BackButtonB = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return <StyledBackButton onClick={handleClick} />;
};

export default BackButtonB;
