import { useNavigate } from "react-router-dom";
import { privateApi, publicApi } from "@api/axios";
import RowCard from "@components/challenge/RowCard";
import { useQuery } from "@tanstack/react-query";

const ChallengeSection = () => {
  const accessToken = localStorage.getItem("accessToken");
  const queryKey = accessToken ? ["challenge", "user"] : ["challenge", "all"];
  const queryFn = accessToken
    ? () => privateApi.get("/challenge/user").then((res) => res.data)
    : () => publicApi.get("/challenge/list").then((res) => res.data);

  const { data: challenges } = useQuery({
    queryKey,
    queryFn,
  });

  const navigate = useNavigate();
  return (
    <section className="px-8 my-10">
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg text-text500">진행중인 챌린지 확인하기</p>
        <p
          className="mr-4 text-sm cursor-pointer text-text150 hover:opacity-50"
          onClick={() => navigate("/challenge")}
        >
          전체 보기
        </p>
      </div>
      <div className="flex w-full gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth custom-scrollbar pb-0.5">
        {challenges &&
          challenges.map((challenge, index) => (
            <RowCard
              key={index}
              id={challenge.id}
              title={challenge.title}
              desc={challenge.description}
              start={challenge.startDate}
              end={challenge.endDate}
              status={challenge.status}
            />
          ))}
      </div>
    </section>
  );
};

export default ChallengeSection;
