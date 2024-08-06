import { Link } from "react-router-dom";
import styled from "styled-components";
import playerbutton from '@images/tutorial/playerbutton.svg'

const CardContainer = styled(Link)`
  width: 100%;
  height: 121px;
  background-color: #d9d9d9;
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  text-decoration: none;
`;

const VideoContainer = styled.div`
  width: 40%;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.img || ""});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  display: flex;
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  width: 60%;
  height: 121px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const TitleAndText1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const CardTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #353535;
  margin-right: 5px;
`;

const CardContent = styled.span`
  font-size: 10px;
  color: #353535;
`;

const ExerciseCard = ({ img, title, text1, text2, navigateTo }) => {
  return (
    <CardContainer to={navigateTo}>
      <VideoContainer img={img}>
        <img src={playerbutton} width={40}/>
      </VideoContainer>
      <TextContainer>
        <TitleAndText1>
          <CardTitle>{title}</CardTitle>
          <CardContent>{text1}</CardContent>
        </TitleAndText1>
        <CardContent>{text2}</CardContent>
      </TextContainer>
    </CardContainer>
  );
};

export default ExerciseCard;
