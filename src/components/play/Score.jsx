// import { useMemo } from 'react';
import { useSelector } from "react-redux";
import ShowComboEffect from "./ShowComboEffect";
// good -> 10점 orange3
// great -> 20점 orange2
// perfect -> 30점 red
// const scoreMap = {
//   good: 10,
//   great: 20,
//   perfect: 30,
// };

const Score = () => {
  const scoreArr = useSelector((state) => state.play.scoreArray || []);
  // const scoreSum = useMemo(() => {
  //   return scoreArr?.reduce(
  //     (sum, score) => sum + (scoreMap[score.toLowerCase()] || 0),
  //     0
  //   );
  // }, [scoreArr]);

  const scoreColor = () => {
    if (scoreArr.length > 0) {
      const lastScore = scoreArr[scoreArr.length - 1]; // 마지막 점수 획득한 값
      if (lastScore === "Good") return "text-orange3";
      if (lastScore === "Great") return "text-orange2";
      if (lastScore === "Perfect") return "text-red";
    }
    return "text-orange3";
  };

  return (
    <div className="flex flex-col items-center justify-center text-8xl">
      {/* 점수가 아니라 카운트를 나타내줘야한다 근데 혹시 모르니까 주석 처리만 해놓기 */}
      <p className={`font-GameNumber ${scoreColor()} `}>{scoreArr.length}</p>
      {scoreArr.length > 0 && (
        <ShowComboEffect effect={scoreArr[scoreArr.length - 1].toLowerCase()} />
      )}
    </div>
  );
};

export default Score;
