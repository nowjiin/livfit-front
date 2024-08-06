import camera from "@svgs/camera.svg";

import { useNavigate } from "react-router-dom";
import SelectEx from "./SelectEx";

const Exercises = () => {
  const navigate = useNavigate();
  return (
    <div className="px-8 mt-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src={camera} alt="camera" className="mb-2" />
          <p className="text-lg text-text500">
            혼자서도 정확하게! AI로 운동하기
          </p>
        </div>
        <p
          className="mr-4 text-sm cursor-pointer text-text15 hover:opacity-50"
          onClick={() => navigate("/exercise")}
        >
          전체 보기
        </p>
      </div>
      <SelectEx />
    </div>
  );
};

export default Exercises;
