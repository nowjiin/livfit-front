import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";
import BackButton from "./BackButton";
import { ExerciseData } from "./ExerciseData";
import StateCard from "./StateCard";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  font-size: 12px;
  background-color: #f6f6f6;
  padding-bottom: 180px;
`;

const HeaderContainer = styled.div`
  height: 60px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const DetailContainer = styled.div`
  width: 90%;
`;

const TitleDiv = styled.div`
  margin-top: 20px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #353535;
`;

const EngTitle = styled.span`
  font-size: 10px;
  color: #ababab;
`;

const CardList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Content = styled.p`
  font-size: 12px;
  color: #353535;
  white-space: pre-line;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const TestButton = styled.button`
  width: 150px;
  height: 38px;
  margin-top: 20px;
  color: #ffffff;
  background-color: #fb8500;
  border: none;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const SquatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exercise = ExerciseData.find((item) => item.id === parseInt(id));

  if (!exercise) {
    return <PageContainer>운동 정보를 찾을 수 없습니다.</PageContainer>;
  }

  const handleButtonClick = () => {
    navigate('/exercise/squat');
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <BackButton />
      </HeaderContainer>
      <DetailContainer>
        <YouTube
          videoId={exercise.video}
          opts={{
            width: "100%",
            height: "270px",
          }}
        />
        <TitleDiv>
          <Title>{exercise.title} </Title>
          <EngTitle>{exercise.engtitle}</EngTitle>
        </TitleDiv>
        <CardList>
          <StateCard text1="시간" title={exercise.time} text2="" />
          <StateCard text1="세트" title={exercise.sets} text2="" />
        </CardList>
        <Content>{exercise.content}</Content>
        <ButtonWrapper>
          <TestButton onClick={handleButtonClick}>자세 측정하러가기</TestButton>
        </ButtonWrapper>
      </DetailContainer>
    </PageContainer>
  );
};

export default SquatDetail;
