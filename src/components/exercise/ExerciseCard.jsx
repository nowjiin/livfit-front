import { useNavigate } from "react-router-dom";

import { parsedPlay } from "@constants/parsedPlay";

import goButton from "@svgs/exercise/go-button.svg";

const ExerciseCard = ({ exercise }) => {
  const bgClasses = {
    squat: "bg-squat",
    lunge: "bg-lunge",
    pushup: "bg-pushup",
  };
  const navigate = useNavigate();

  return (
    <section
      className={`relative w-full bg-center bg-no-repeat bg-cover rounded-xl ${bgClasses[exercise]} h-60`}
      onClick={() => navigate(exercise)}
    >
      <div className="absolute inset-0 bg-black/35 rounded-xl">
        <div className="relative w-full h-full p-4">
          <div className="relative flex items-center justify-end gap-2 mt-36">
            <p className="text-6xl uppercase font-English text-text50">
              {exercise}
            </p>
            <img src={goButton} alt="go-button" />
            <p className="absolute text-sm -top-4 right-16 text-text50">
              {parsedPlay(exercise)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExerciseCard;
