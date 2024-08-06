import ExerciseCard from "@components/exercise/ExerciseCard";

const ExercisePage = () => {
  return (
    <div className="px-6 pt-6 bg-[#F6F6F6] h-full pb-20">
      <p className="text-3xl">AI 운동 측정하기</p>
      <h1 className="mt-2 text-xs text-text200">
        카메라를 통해 정확한 운동 동작으로 진행해보아요!
      </h1>
      <section className="flex flex-col w-full gap-4 mt-6 overflow-y-auto scroll-smooth">
        <ExerciseCard exercise="squat" />
        <ExerciseCard exercise="lunge" />
        <ExerciseCard exercise="pushup" />
        <div className="pb-3"></div> 
      </section>
    </div>
  );
};

export default ExercisePage;
