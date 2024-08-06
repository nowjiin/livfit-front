import { useNavigate } from "react-router-dom";

import muscle from "@images/muscle.png";
import smallArrow from "@svgs/small-right-arrow.svg";

const HotSection = () => {
  const navigate = useNavigate();
  return (
    <section
      className="p-4 rounded-xl bg-[#F7ECD1] relative hover:scale-105 transition-all cursor-pointer"
      onClick={() => navigate("/tutorial")}
    >
      <div className="mb-2 text-lg">
        <h1>현재 LIVFIT에서</h1>
        <h2>가장 핫한 운동 배우기</h2>
      </div>
      <span className="flex items-center gap-1">
        <p className="text-sm text-text150">자세히 보기</p>
        <img src={smallArrow} alt="small-arrow" />
      </span>
      <img src={muscle} alt="muscle" className="absolute bottom-6 right-6" />
    </section>
  );
};

export default HotSection;
