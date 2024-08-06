const RoundColorSection = ({ imageSrc, nickname, score, rank }) => {
  const bgColor = rank === 1 ? "#FFE487" : rank === 2 ? "#FFECAD" : "#FFF2C6";
  return (
    <div
      className="flex items-center justify-between rounded-[46px] w-full px-8 py-3"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center gap-4">
        <img src={imageSrc} alt="one" />
        <p>{nickname}</p>
      </div>
      <p>{score}</p>
    </div>
  );
};

export default RoundColorSection;
