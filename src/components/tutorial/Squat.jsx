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

import basicSquat from "@images/tutorial/squat1.png";
import halfSquat from "@images/tutorial/squat2.png";
import wideSquat from "@images/tutorial/squat3.png";
import squatMain from "@images/tutorial/squatmain.png";

export default function Squat() {
  return (
    <ExerciseContainer>
      <HeroShot>
        <BackButton />
        <img className="mainImage" src={squatMain} />
      </HeroShot>
      <MiniDivContainer>
        <StateCard text1="카테고리" title="하체" text2=" Lower" />
        <StateCard text1="레벨" title="중급자" text2=" Intermediate" />
      </MiniDivContainer>
      <BasicContainer>
        <MainTitle>베이직</MainTitle>
        <ExerciseCard
          img={basicSquat}
          title="기본 스쿼트"
          text1="Basic Squat"
          text2="3set 15min"
          navigateTo="/tutorial/squat/1"
        />
      </BasicContainer>
      <AdvancedContainer>
        <MainTitle>응용 동작</MainTitle>
        <ExerciseCard
          img={halfSquat}
          title="하프 스쿼트"
          text1="Half Squat"
          text2="3set 10min"
          navigateTo="/tutorial/squat/2"
        />
        <ExerciseCard
          img={wideSquat}
          title="와이드 스쿼트"
          text1="Wide Squat"
          text2="3set 12min"
          navigateTo="/tutorial/squat/3"
        />
      </AdvancedContainer>
    </ExerciseContainer>
  );
}
