import { useState } from "react";
import { useParams } from "react-router-dom";

import TipSection from "@commons/TipSection";
import NameSection from "@components/exercise/NameSection";
import OptionFilter from "@components/exercise/OptionFilter";
import Navbar from "@layouts/Navbar";

const DetailExercisePage = () => {
  const { name: exercise } = useParams();
  const [showOption, setShowOption] = useState(false);

  const bgClasses = {
    squat: "bg-squat_detail",
    lunge: "bg-lunge_detail",
    pushup: "bg-pushup_detail",
  };

  // 운동별 TIP 문구를 저장할 객체
  const tips = {
    squat: "스쿼트는 자세 정확도에 따라 효과가 달라져요!",
    lunge: "런지는 무릎의 각도를 조절하는 것이 중요해요!",
    pushup: "푸쉬업은 손의 위치와 몸의 각도가 중요합니다!",
  };

  // 현재 선택된 운동에 대한 TIP 문구를 가져오기
  const tipDesc = tips[exercise] || "운동에 대한 정보를 확인하세요.";

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-10 w-full bg-black/60" />
      <div
        className={`absolute inset-0 w-full h-full bg-no-repeat bg-cover ${bgClasses[exercise]} z-0`}
      />
      <div className="relative z-20 flex flex-col h-full">
        <Navbar isWhite closed />
        <main className="flex flex-col justify-between flex-grow px-10 mt-10 mb-12">
          <TipSection desc={tipDesc} /> {/* 운동에 맞는 TIP 문구를 전달 */}
          <NameSection
            name={exercise}
            showOption={showOption}
            setShowOption={setShowOption}
          />
        </main>
        <div
          className={`border pb-10 absolute bottom-0 left-0 right-0 h-[65%] w-full rounded-t-xl bg-text50 ${
            showOption ? "block slide-up" : "hidden"
          }`}
        >
          <OptionFilter exercise={exercise} />
        </div>
      </div>
    </div>
  );
};

export default DetailExercisePage;
