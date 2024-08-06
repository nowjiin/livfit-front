import { parsedPlay } from "@constants/parsedPlay";

const NameSection = ({ name, showOption, setShowOption }) => {
  // 운동별 이름과 설명
  const exerciseInfo = {
    squat: {
      displayName: "스쿼트",
      description:
        "허벅지 근육과 엉덩이 근육을 탄탄하게 만들어 주며 전반적인 체형 개선에 도움을 줍니다.",
    },
    lunge: {
      displayName: "런지",
      description: "균형 감각을 키워주며 하체 근력을 강화합니다.",
    },
    pushup: {
      displayName: "푸쉬업",
      description: "상체 근육을 강화하고 코어 근력을 높입니다.",
    },
  };

  // 현재 선택된 운동에 대한 이름과 설명을 가져오기
  const currentExercise = exerciseInfo[name] || {
    displayName: "알 수 없는 운동",
    description: "이 운동에 대한 설명이 없습니다.",
  };

  return (
    <div className="relative flex flex-col gap-2">
      <h1 className="text-2xl font-semibold text-text50">{parsedPlay(name)}</h1>
      <h2 className="uppercase text-7xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-English text-orange2">
        {name}
      </h2>{" "}
      <h3 className="text-text100">{currentExercise.description} </h3>
      <button
        className={`${
          showOption ? "text-text50" : "text-[#313131]"
        } text-xl bg-text50 rounded-[74px] w-full py-4 mt-10 font-semibold`}
        onClick={() => setShowOption(!showOption)}
      >
        옵션 선택하기
      </button>
    </div>
  );
};

export default NameSection;
