import { publicApi } from "@api/axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setPlay } from "@redux/slices/playSlice";

import progress from "@images/progress.png";
import fire from "@svgs/fire.svg";
import rightArrow from "@svgs/right-arrow.svg";

const TodayMission = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data: mission } = useQuery({
    queryKey: ["mission"],
    queryFn: () =>
      publicApi
        .get("/mainpage/getTodayexercise")
        .then((response) => response.data),
  });

  let content;

  if (mission) {
    const missionHandler = () => {
      dispatch(
        setPlay({
          goalSet: "1세트",
          playTime: `0분 ${mission.timerSec}초`,
          restTime: "0초",
        })
      );
      navigate(`/play/${mission.exercise}`);
    };
    content = (
      <div
        onClick={missionHandler}
        className="flex items-center justify-between mb-3"
      >
        <div>
          <h1 className="mb-2 text-xs font-light text-text150">오늘의 미션</h1>
          <span className="flex items-center gap-1 text-2xl font-semibold text-text500">
            <img src={fire} alt="fire" />
            <p className="">{mission.exerciseName}</p>
          </span>
        </div>
        <img src={rightArrow} alt="right-arrow" />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-2 px-6 pt-6 transition-all shadow-xl cursor-pointer rounded-2xl hover:scale-105">
      {content}
      <img src={progress} alt="dummy-progress" className="mb-5" />
      <div className="flex items-center justify-center w-full gap-1 text-3xl font-bold mini:text-4xl tablet:text-5xl font-English">
        <p className="text-outline-black">TODAY</p>
        <p className="text-text500">MISSION</p>
      </div>
    </section>
  );
};

export default TodayMission;
