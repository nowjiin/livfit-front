import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { publicApi } from "@api/axios";

import TipSection from "@commons/TipSection";

import RoundColorSection from "@components/turtle/RoundColorSection";

import Navbar from "@layouts/Navbar";

import fistImage from "@images/challenge/fist.png";
import trackBar from "@images/turtle/track-bar.png";
import one from "@svgs/home/one.svg";
import three from "@svgs/home/three.svg";
import two from "@svgs/home/two.svg";

const TurtlePage = () => {
  const navigate = useNavigate();
  const { data: turtleRecords } = useQuery({
    queryKey: ["turtle"],
    queryFn: () => publicApi("/turtle/all-records"),
  });

  const handleTrackHandler = async () => {
    navigate("/turtle/play"); // 페이지 이동
  };

  let content;

  if (turtleRecords && turtleRecords.data.length > 0) {
    const sortedRecords = turtleRecords.data.sort((a, b) => b.score - a.score);
    content = (
      <div className="flex flex-col items-center gap-2 mt-4">
        {sortedRecords.length > 0 && (
          <RoundColorSection
            imageSrc={one}
            nickname={sortedRecords[0].nickname}
            score={sortedRecords[0].score}
            rank={1}
          />
        )}
        {sortedRecords.length > 1 && (
          <RoundColorSection
            imageSrc={two}
            nickname={sortedRecords[1].nickname}
            score={sortedRecords[1].score}
            rank={2}
          />
        )}
        {sortedRecords.length > 2 && (
          <RoundColorSection
            imageSrc={three}
            nickname={sortedRecords[2].nickname}
            score={sortedRecords[2].score}
            rank={3}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full pb-24 overscroll-y-hidden">
      <div className="relative w-full h-[610px]">
        <div className="absolute inset-0 z-10 w-full bg-black/40" />
        <div
          className={`absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-turtle `}
        />
        <div className="relative z-20 flex flex-col h-full">
          <Navbar isWhite />
          <section className="px-8 pt-6 text-text50">
            <p className="text-2xl">거북목 측정하기</p>
            <h1 className="mt-2 mb-4 text-xs">
              거북목 정도를 측정해보고 친구랑 비교해보세요! 바른 자세 습관
              기르는데 도움이 되요
            </h1>
            <TipSection desc="거북목 측정은 3초간 진행돼요!" />
          </section>
          <div className="flex flex-col items-center justify-center gap-10 px-8 mt-10">
            <img src={trackBar} alt="trackBar" />
            <button
              className="w-full h-[58px] rounded-[74px] bg-orange2 mb-10 text-text50 font-semibold hover:opacity-80 transition-all"
              onClick={handleTrackHandler}
            >
              측정하러가기
            </button>
          </div>
        </div>
      </div>

      <section className="px-6 py-2 bg-text90">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={fistImage} alt="fist-image" />
            <p className="text-xl">랭킹</p>
          </div>
          <p
            className="text-sm cursor-pointer text-text200 hover:opacity-50"
            onClick={() => navigate("ranking")}
          >
            전체 랭킹 확인하기
          </p>
        </div>
        {content}
      </section>
    </div>
  );
};

export default TurtlePage;
