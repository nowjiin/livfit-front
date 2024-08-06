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

import basicLunge from "@images/tutorial/lunge1.png";
import sideLunge from "@images/tutorial/lunge2.png";
import reverseLunge from "@images/tutorial/lunge3.png";
import lungeMain from "@images/tutorial/lungemain.png";

export default function Lunge() {
  return (
    <ExerciseContainer>
      <HeroShot>
        <BackButton />
        <img className="mainImage" src={lungeMain} />
      </HeroShot>
      <MiniDivContainer>
        <StateCard text1="카테고리" title="하체" text2=" Lower" />
        <StateCard text1="레벨" title="초급자" text2=" Beginner" />
      </MiniDivContainer>
      <BasicContainer>
        <MainTitle>베이직</MainTitle>
        <ExerciseCard
          img={basicLunge}
          title="기본 런지"
          text1="Basic Lunge"
          text2="3set 10min"
          navigateTo="/tutorial/lunge/4"
        />
      </BasicContainer>
      <AdvancedContainer>
        <MainTitle>응용 동작</MainTitle>
        <ExerciseCard
          img={sideLunge}
          title="사이드 런지"
          text1="Side Lunge"
          text2="3set 12min"
          navigateTo="/tutorial/lunge/5"
        />
        <ExerciseCard
          img={reverseLunge}
          title="리버스 런지"
          text1="Reverse Lunge"
          text2="3set 12min"
          navigateTo="/tutorial/lunge/6"
        />
      </AdvancedContainer>
    </ExerciseContainer>
  );
}
