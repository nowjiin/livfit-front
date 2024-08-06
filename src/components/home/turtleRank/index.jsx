import { useNavigate } from "react-router-dom";
import Rankings from "./Rankings";

import smallArrow from "@svgs/small-right-arrow.svg";

const TurtleRank = () => {
  const navigate = useNavigate();
  return (
    <section
      className="p-4 transition-all cursor-pointer rounded-xl bg-text50 hover:scale-105"
      onClick={() => navigate("/turtle")}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-lg">오늘의 거북목 랭킹</h1>
        <span className="flex items-center gap-1">
          <h2 className="text-xs text-text150">측정하러 가기</h2>
          <img src={smallArrow} alt="small-arrow" />
        </span>
      </div>

      <Rankings />
    </section>
  );
};

export default TurtleRank;
