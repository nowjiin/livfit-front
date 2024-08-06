import { useEffect, useState } from "react";

import bulb from "@images/rest/bulb.png";

const RestScreen = ({ restTime, setRest, exercise }) => {
  const [timeLeft, setTimeLeft] = useState(restTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      setRest(false); // 본래 화면으로 돌아가기
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 각 운동에 대한 문구 설정
  const getRestTips = (exercise) => {
    switch (exercise) {
      case "squat":
        return (
          <>
            <p className="mb-2 whitespace-nowrap">
              발가락을 오므리고 마치 바닥을 움켜잡는 느낌으로 스쿼트를 해보세요!
            </p>
            <p className="whitespace-nowrap">
              자세도 안정적이고 중반부에도 계속해서 하체를 이용해 일어날 수 있게
              됩니다!
            </p>
          </>
        );
      case "pushup":
        return (
          <>
            <p className="mb-2 whitespace-nowrap">
              팔꿈치를 몸쪽으로 붙이고, 몸 전체를 하나의 선으로 유지하세요.
            </p>
            <p className="whitespace-nowrap">
              코어에 힘을 주고 상체가 내려갈 때 숨을 들이마시세요.
            </p>
          </>
        );
      case "lunge":
        return (
          <>
            <p className="mb-2 whitespace-nowrap">
              앞무릎이 발끝을 넘지 않도록 하고, 뒷무릎은 바닥에 가까이 두세요.
            </p>
            <p className="whitespace-nowrap">
              균형을 유지하고 중심을 낮추면 더 효과적인 런지를 할 수 있습니다.
            </p>
          </>
        );
      // Add more exercises and tips as needed
      default:
        return (
          <>
            <p className="mb-2 whitespace-nowrap">
              휴식을 취하면서 다음 세트에 집중하세요.
            </p>
            <p className="whitespace-nowrap">
              근육을 이완하고 호흡을 정리하며 몸을 준비하세요.
            </p>
          </>
        );
    }
  };

  return (
    <div className="absolute inset-0 z-30 flex justify-center w-full h-full bg-black">
      <section className="relative flex flex-col items-center gap-1 mt-28">
        <p className="absolute text-6xl top-12 text-lightblue2 font-Score">
          REST
        </p>
        <p
          className="text-[280px] font-GameNumber rest-effect"
          data-text={timeLeft}
        >
          {timeLeft}
        </p>
        <div className="absolute flex items-center justify-center gap-2 top-96">
          <img src={bulb} alt={bulb} />
          <div className="text-[10px] text-text50">{getRestTips(exercise)}</div>
        </div>
      </section>
    </div>
  );
};

export default RestScreen;
