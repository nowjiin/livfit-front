import clap from "@svgs/profile/clap.svg";

const GreetSection = ({ nickname, count, totalPoint }) => {
  return (
    <section className="flex items-center gap-4">
      <img src={clap} alt="clap" />
      <div className="flex flex-col gap-1 text-xl font-light">
        <p className="text-[#818181]">{nickname}님</p>
        <span className="flex items-center">
          <p className="text-orange2">{count}번</p>
          <p className="text-[#818181]">의 미션을 성공했네요</p>
        </span>
        <span className="flex items-center">
          <p className="mr-1 text-[#818181]">총</p>
          <p className="text-orange2">{totalPoint.toLocaleString()}</p>
          <p className="text-[#818181]">포인트를 적립했어요!</p>
        </span>
      </div>
    </section>
  );
};

export default GreetSection;
