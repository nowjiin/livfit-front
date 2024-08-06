const RatingCard = ({ scoreArr }) => {
  const goodCount = scoreArr.filter((score) => score === "Good").length;
  const greatCount = scoreArr.filter((score) => score === "Great").length;
  const perfectCount = scoreArr.filter((score) => score === "Perfect").length;

  return (
    <div className="grid items-center w-full grid-cols-3 gap-4 px-12 font-semibold text-center text-text50">
      <div className="py-[2px] rounded-xl bg-good">GOOD {goodCount}</div>
      <div className="py-[2px] rounded-xl bg-great">GREAT {greatCount}</div>
      <div className="py-[2px] rounded-xl bg-perfect">
        PERFECT {perfectCount}
      </div>
    </div>
  );
};

export default RatingCard;
