import { useQuery } from "@tanstack/react-query";

import { privateApi } from "@api/axios";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import DummyGraph from "./DummyGraph";

import { timeFormat } from "@utils/timeFormat";

const ShowGraphRecords = ({ exercise }) => {
  const { data } = useQuery({
    queryKey: ["exercise", "profile", "graph", exercise],
    queryFn: () => privateApi.get(`/${exercise}/graph`).then((res) => res.data),
  });

  if (!data) {
    return <p>측정된 운동 기록이 없습니다.</p>;
  }

  if (data && data.length > 0) {
    return (
      <div className="flex flex-col items-center p-4">
        <p className="text-lg text-text400">
          {format(
            new Date(data[data.length - 1].createdAt),
            "yyyy년 MM월 dd일",
            { locale: ko }
          )}
          <span className="mx-2">~</span>
          {format(new Date(data[0].createdAt), "yyyy년 MM월 dd일", {
            locale: ko,
          })}
        </p>

        <p className="mt-4 text-6xl text-text400">{data[0].total_counts}</p>
        <p className="text-sm text-[#A4A4A4]">총개수</p>

        <p className="mt-4 text-xl">{timeFormat(data[0].total_time, true)}</p>
        <p className="text-sm text-[#A4A4A4]">총시간</p>
        {data && <DummyGraph graph={data} />}
      </div>
    );
  }
};

export default ShowGraphRecords;
