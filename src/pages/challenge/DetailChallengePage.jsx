import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { privateApi, publicApi } from "@api/axios";

import DetailSection from "@components/challenge/DetailSection";
import GroupButton from "@components/challenge/GroupButton";

const DetailChallengePage = () => {
  const navigate = useNavigate();

  const challengeId = useParams().id;

  const { data } = useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: () =>
      publicApi.get(`/challenge/detail/${challengeId}`).then((res) => res.data),
  });

  const { data: isCurrentUser } = useQuery({
    queryKey: ["nickname"],
    queryFn: () =>
      privateApi.get("/mainpage/getname").then((response) => response.data),
  });

  // 에러 나면 이제 참가중이므로 따로 표시 필요
  // onSuccess -> 마이페이지 profile/my-challenge 페이지로 이동

  const putMutation = useMutation({
    mutationFn: (body) => privateApi.put("/challenge/update-status", body),
    onSettled: () => {
      navigate("/profile/my-challenges");
    },
  });

  const buttonHandler = () => {
    if (isCurrentUser) {
      putMutation.mutate({ challengeId: Number(challengeId) });
    } else {
      alert("로그인이 필요한 서비스입니다. 로그인 해주세요 !");
      navigate("/login");
    }
  };

  return (
    <div className="px-6 py-6 bg-[#F6F6F6] h-full">
      {data && (
        <>
          <DetailSection
            title={data.title}
            desc={data.description}
            difficulty={data.difficulty}
            reward={data.reward}
            start={data.startDate}
            end={data.endDate}
            certificate={data.certificate}
          />
          <GroupButton handler={buttonHandler} />
        </>
      )}
    </div>
  );
};

export default DetailChallengePage;
