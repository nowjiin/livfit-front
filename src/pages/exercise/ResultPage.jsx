import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PlayNavbar from "@layouts/PlayNavbar";

import BreakEnding from "@components/ending/BreakEnding";
import EndingGroupButton from "@components/ending/GroupButton";

import { parsedPlay } from "@constants/parsedPlay";

const ResultPage = () => {
  const exercise = useParams().exercise; // 어떤 운동인지 ? parameter값 가져오기 용도
  const scoreArr = useSelector((state) => state.play.scoreArray || []); // 리덕스 저장된 전역변수 불러오기
  const playTime = useSelector((state) => state.play.playTime);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full overflow-auto bg-black">
        <PlayNavbar title={parsedPlay(exercise)} styles notPrev />
        <BreakEnding
          scoreArr={scoreArr}
          subject={exercise}
          currentCount={scoreArr.length}
          playTime={playTime}
        />
        <section className="w-full pb-20 mt-10">
          <EndingGroupButton />
        </section>
      </div>
    </>
  );
};

export default ResultPage;
