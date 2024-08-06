import lunge from "@images/lunge.png";
import pushup from "@images/pushup.png";
import squat from "@images/squat.png";
import { useNavigate } from "react-router-dom";

const SelectEx = () => {
  const navigate = useNavigate();
  return (
    <div className="flex overflow-x-auto scroll-smooth custom-scrollbar">
      <img
        src={squat}
        alt="squat"
        className="w-40 h-48 mr-2 transition-all cursor-pointer shrink-0 hover:scale-95"
        onClick={() => navigate("/exercise/squat")}
      />
      <img
        src={lunge}
        alt="lunge"
        className="w-40 h-48 mr-2 transition-all cursor-pointer shrink-0 hover:scale-95"
        onClick={() => navigate("/exercise/lunge")}
      />
      <img
        src={pushup}
        alt="pushup"
        className="w-40 h-48 mr-2 transition-all cursor-pointer shrink-0 hover:scale-95"
        onClick={() => navigate("/exercise/pushup")}
      />
    </div>
  );
};

export default SelectEx;
