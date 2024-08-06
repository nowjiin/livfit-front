import { privateApi } from "@api/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EffectText from "@commons/EffectText";
import { stringTimeFormat } from "@utils/timeFormat";
import RatingCard from "./RatingCard";
import RecordTable from "./RecordTable";

const BreakEnding = ({ scoreArr, subject, currentCount, playTime }) => {
  const navigate = useNavigate();
  const [isBreak, setIsBreak] = useState(false);
  const { data: records, isError } = useQuery({
    queryKey: ["exercise", subject],
    queryFn: () =>
      privateApi.get(`/${subject}/get_my_record`).then((res) => res.data),
    retry: false,
  });

  let content;

  useEffect(() => {
    if (records) {
      let highestCount = records.reduce((max, record) => {
        return Math.max(max, record.count);
      }, 0);

      if (currentCount > highestCount) setIsBreak(true);
      else setIsBreak(false);
    }
  }, [records, currentCount]);

  if (isError) {
    content = (
      <div className="relative flex items-center justify-center w-full h-72">
        <div className="absolute inset-0 bg-ending_blur_table" />
        <section className="z-10">
          <p className="text-lg font-semibold text-text50">
            내 기록 저장하고 한눈에 보러가기!
          </p>
          <button
            className="px-8 py-1 mt-2 border-2 border-orange2 text-text400 bg-text50 rounded-xl"
            onClick={() => navigate("/auth/login")}
          >
            로그인 하러가기
          </button>
        </section>
      </div>
    );
  }
  if (records) {
    content = (
      <div className="w-full px-10 mt-10 overflow-y-auto h-52 text-text150 custom-scrollbar">
        <RecordTable records={records} />
      </div>
    );
  }

  return (
    <section className="relative w-full text-center text-text50">
      <div
        className={`absolute w-full h-32 bg-center bg-no-repeat bg-contain top-10 bg-opacity-10 ${
          isBreak ? "bg-break_effect" : "bg-no_break_effect"
        } `}
      />
      <EffectText text={scoreArr.length} isBreak={isBreak} />
      <p className="absolute text-3xl right-16 top-32 font-GameNumber">
        {stringTimeFormat(playTime)}
      </p>
      <RatingCard scoreArr={scoreArr} />
      <div className="mt-8">
        {isBreak ? (
          <>
            <p className="font-semibold">축하합니다!</p>
            <p className="font-semibold">새로운 기록을 달성하셨군요!</p>
          </>
        ) : (
          <>
            <p className="font-semibold">잘하셨어요!</p>
            <p className="font-semibold">다음에는 더 분발해보세요!</p>
          </>
        )}
      </div>
      {content}
    </section>
  );
};

export default BreakEnding;
