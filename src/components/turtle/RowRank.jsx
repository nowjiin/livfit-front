import circleTurtle from "@svgs/turtle/circle-turtle.svg";

const RowRank = ({ data, seq, userNickname }) => {
  return (
    <section
      className={`${
        data.nickname === userNickname && "bg-[#FFEDAF]"
      } flex items-center justify-between px-8 py-4 text-text200`}
    >
      <div className="flex items-center gap-3">
        <p>{seq}</p>
        <img src={circleTurtle} alt="circle-turtle" className="ml-4" />
        <p>{data.nickname}</p>
      </div>
      <p>{data.score}점</p>
    </section>
  );
};

export default RowRank;
