import BackButton from "./BackButton";
import ExerciseCard from "./ExerciseCard";
import {
  AdvancedContainer,
  BasicContainer,
  ExerciseContainer,
  HeroShot,
  MainTitle,
  MiniDivContainer,
} from "./ExerciseStyles";
import StateCard from "./StateCard";

import basicPushup from "/src/assets/images/tutorial/pushup1.png";
import KneePushup from "/src/assets/images/tutorial/pushup2.png";
import diamondPushup from "/src/assets/images/tutorial/pushup3.png";
import pushupMain from "/src/assets/images/tutorial/pushupmain.png";

export default function Pushup() {
  return (
    <ExerciseContainer>
      <HeroShot>
        <BackButton />
        <img className="mainImage" src={pushupMain} />
      </HeroShot>
      <MiniDivContainer>
        <StateCard text1="카테고리" title="상체" text2=" Upper" />
        <StateCard text1="레벨" title="중급자" text2=" Intermediate" />
      </MiniDivContainer>
      <BasicContainer>
        <MainTitle>베이직</MainTitle>
        <ExerciseCard
          img={basicPushup}
          title="기본 푸시업"
          text1="Basic Push-Up"
          text2="3set 8min"
          navigateTo="/tutorial/pushup/7"
        />
      </BasicContainer>
      <AdvancedContainer>
        <MainTitle>응용 동작</MainTitle>
        <ExerciseCard
          img={KneePushup}
          title="니 푸시업"
          text1="Knee Push-Up"
          text2="3set 8min"
          navigateTo="/tutorial/pushup/8"
        />
        <ExerciseCard
          img={diamondPushup}
          title="다이아몬드 푸시업"
          text1="Diamond Push-Up"
          text2="3set 10min"
          navigateTo="/tutorial/pushup/9"
        />
      </AdvancedContainer>
    </ExerciseContainer>
  );
}
