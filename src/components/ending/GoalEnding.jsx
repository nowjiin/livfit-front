import clearImage from "@images/ending/clear.png";
import failImage from "@images/ending/fail.png";

const GoalEnding = ({ scoreLength }) => {
  // 우선 개수만 받자 타이머 맞춘 시간은 나중에 넣어보기로 하고
  let success = false;
  let content;
  // 목표가 성공했을 때
  // 목표가 실패했을 때
  if (success) {
    content = (
      <div className="flex flex-col items-center justify-center text-sm text-text50">
        <p>축하합니다</p>
        <p>목표량을 달성하셨군요!</p>
        <img src={clearImage} alt={clearImage} />
        <span className="flex items-end justify-center gap-2 font-GameNumber text-text50">
          <p className="text-8xl">{scoreLength}</p>
          <p className="mb-2 text-3xl">1:00</p>
        </span>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center text-sm text-text50">
        <p>아쉽군요</p>
        <p>다시 한번 더 도전해보세요!</p>
        <img src={failImage} alt={failImage} />
        <span className="flex items-end justify-center gap-2 font-GameNumber text-red2">
          <p className="text-8xl">{scoreLength}</p>
          <p className="mb-2 text-3xl">1:00</p>
        </span>
      </div>
    );
  }

  return <section className="mb-20">{content}</section>;
};

export default GoalEnding;
