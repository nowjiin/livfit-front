import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { privateApi, publicApi } from "@api/axios";

import Contents from "@components/challenge/Contents";
import Header from "@components/challenge/Header";

import dots from "@svgs/challenge/dots.svg";
import arrow from "@svgs/challenge/small-arrow.svg";

const ChallengePage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const { data: challenges } = useQuery({
    queryKey: ["challenge", "all"],
    queryFn: () => publicApi.get("/challenge/list").then((res) => res.data),
  });

  const { data: isCurrentUser } = useQuery({
    queryKey: ["nickname"],
    queryFn: () =>
      privateApi.get("/mainpage/getname").then((response) => response.data),
    enabled: !!accessToken,
  });

  return (
    <div className="w-full h-screen overflow-y-hidden">
      <Header />
      <div className="flex-1 h-full p-6 overflow-y-auto border -translate-y-12 rounded-tl-[32px] rounded-tr-[32px] shadow-lg bg-text50 pb-20">
        <div className="h-full overflow-y-scroll pb-60 custom-scrollbar">
          <section className="flex items-center justify-between px-4 mb-4">
            <img src={dots} alt="dots" />
            {isCurrentUser && (
              <div
                className="flex items-center gap-1 px-4 py-1 transition-all rounded-lg cursor-pointer bg-orange2 text-text50 hover:opacity-50"
                onClick={() => navigate("/profile/my-challenges")}
              >
                <p className="text-sm font-semibold">내 챌린지</p>
                <img src={arrow} alt="small-arrow" />
              </div>
            )}
          </section>
          {challenges && challenges.length > 0 && (
            <Contents data={challenges} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
