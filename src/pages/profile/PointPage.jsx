import { privateApi } from "@api/axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import FilterSection from "@components/point/FilterSection";
import GreetSection from "@components/point/GreetSection";
import Header from "@components/point/Header";
import RowCard from "@components/point/RowCard";

const PointPage = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["profile", "point", "history"],
    queryFn: () => privateApi.get("/points").then((res) => res.data),
  });

  let content;

  if (data) {
    content = (
      <div className="h-full flex flex-col mb-20 custom-scrollbar">
        <GreetSection
          nickname={data[0].nickname}
          count={data.length || 0}
          totalPoint={data[data.length - 1].totalPoints}
        />
        <section className="flex-shrink-0 flex flex-col gap-2 mt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#AFAFAF] text-xs">내 포인트</p>
              <p className="text-xl">
                {data[data.length - 1].totalPoints.toLocaleString()}P
              </p>
            </div>
            <button
              onClick={() => navigate("/store")}
              className="p-2 text-center rounded-xl w-44 text-text50 bg-orange2"
            >
              포인트 사용하러가기
            </button>
          </div>
          <hr className="mt-8 mb-4" />
          <FilterSection />
        </section>
        {data.length > 0 && (
          <section className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-2 mt-6 mb-12">
              {data.map((d, index) => (
                <RowCard
                  key={index}
                  title={d.title}
                  date={d.eventDate}
                  desc={d.description}
                  point={d.points}
                  accPoint={d.totalPoints}
                  type={d.type}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-y-auto custom-scrollbar">
      <header className="relative flex-shrink-0 flex flex-col w-full gap-2">
        <Header />
      </header>
      <div className="flex-1 flex flex-col p-6 -translate-y-6 rounded-tl-[32px] rounded-tr-[32px] shadow-lg bg-text50 pb-20 custom-scrollbar overflow-hidden">
        {content}
      </div>
    </div>
  );
};

export default PointPage;
