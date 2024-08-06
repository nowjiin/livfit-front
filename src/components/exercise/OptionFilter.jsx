import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setPlay } from "@redux/slices/playSlice";

import SelectOption from "./SelectOption";

import TabBar from "@svgs/exercise/tab-bar.svg";

// 목표 세트 옵션 배열 (1세트부터 5세트까지)
const countsArr = Array.from({ length: 5 }, (_, i) => `${i + 1}세트`);

// 제한 시간 옵션 배열
const minutesArr = [0, 1, 2, 3, 5, 10]; // 분을 나타내는 숫자 배열
const secondsArr = [0, 30, 40, 50]; // 초를 나타내는 숫자 배열

// 쉬는 시간 옵션 배열
const restSecondsArr = [10, 20, 30, 40, 50]; // 초를 나타내는 숫자 배열

const OptionFilter = ({ exercise }) => {
  const navigate = useNavigate();

  // 상태 설정
  const [goalSet, setGoalSet] = useState("1세트"); // 기본 목표 세트
  const [playMinutes, setPlayMinutes] = useState(0); // 기본 제한 시간 분
  const [playSeconds, setPlaySeconds] = useState(30); // 기본 제한 시간 초
  const [restSeconds, setRestSeconds] = useState(10); // 기본 쉬는 시간

  const dispatch = useDispatch();

  const handleStartClick = () => {
    // 제한 시간을 문자열로 변환하여 저장
    const playTime = `${playMinutes}분 ${playSeconds}초`;
    const restTime = `${restSeconds}초`;

    // Redux 스토어에 상태 저장
    dispatch(setPlay({ goalSet, playTime, restTime }));

    // 플레이 화면으로 이동
    navigate(`/play/${exercise}`);
  };

  return (
    <div className="w-full h-full overflow-y-scroll custom-scrollbar">
      <div className="flex items-center justify-center">
        <img src={TabBar} alt="tab-bar" className="mt-6" />
      </div>
      <div className="flex flex-col justify-start px-10 mt-6">
        <p className="text-2xl font-semibold">옵션</p>
        <hr className="my-5" />
        <section className="flex flex-col gap-5">
          {/* 목표 세트 선택 */}
          <SelectOption
            title="목표 세트"
            values={countsArr}
            onChange={(e) => setGoalSet(e.target.value)}
          />

          {/* 쉬는 시간 선택 */}
          <SelectOption
            title="쉬는 시간"
            values={restSecondsArr.map((sec) => `${sec}초`)} // 텍스트 형식으로 변환
            onChange={(e) => setRestSeconds(parseInt(e.target.value, 10))} // 숫자로 변환하여 저장
          />

          {/* 제한 시간 선택 (분, 초) */}
          <SelectOption
            title="제한 시간"
            values={[
              minutesArr.map((min) => `${min}분`),
              secondsArr.map((sec) => `${sec}초`),
            ]} // 텍스트 형식으로 변환
            step={3}
            onMinutesChange={(e) =>
              setPlayMinutes(parseInt(e.target.value, 10))
            } // 숫자로 변환하여 저장
            onSecondsChange={(e) =>
              setPlaySeconds(parseInt(e.target.value, 10))
            } // 숫자로 변환하여 저장
          />

          {/* 이전 기록 보러가기 제거 */}
          {/* <p className="px-6 py-3 mt-4 border rounded-lg text-end border-orange2 text-text400 w-fit">
            이전 기록 보러가기
          </p> */}

          <button
            onClick={handleStartClick}
            className="text-text50 text-xl bg-orange2 rounded-[74px] w-full py-4 mt-10 font-semibold mb-2"
          >
            운동 시작하기
          </button>
        </section>
      </div>
    </div>
  );
};

export default OptionFilter;
