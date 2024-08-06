import BallonText from "./BallonText";

const ProgressBar = ({ totalStep, step }) => {
  const totalSteps = totalStep;
  const progressWidth = (step / totalSteps) * 100;

  return (
    <div className="relative w-full mt-16 mb-6">
      <div
        className="absolute -top-12"
        style={{
          left: `calc(${progressWidth}% - 50px)`,
        }}
      >
        {progressWidth && (
          <BallonText>{Math.floor(progressWidth)}% 달성</BallonText>
        )}
      </div>
      <div className="w-full h-4 rounded-[51px] bg-[#FFF0C9] overflow-hidden">
        <section
          className="h-4 p-0 rounded-[51px] bg-yellow transition-all duration-500 ease-in-out"
          style={{
            width: `${progressWidth}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
