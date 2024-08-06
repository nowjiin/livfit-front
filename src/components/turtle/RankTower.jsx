import one from "@svgs/turtle/one.svg";
import three from "@svgs/turtle/three.svg";
import two from "@svgs/turtle/two.svg";

const RankTower = ({ data }) => {
  return (
    <div className="w-full h-80">
      <section className="grid w-full grid-cols-3 gap-2 font-medium place-items-end">
        <div className="flex flex-col items-center justify-center w-full ">
          <img src={two} alt="two" />
          <p>{data[1].nickname}</p>
          <p className="text-sm text-text200">{data[1].score}점</p>
          <div className="relative w-full h-20 bg-text50 rounded-t-xl">
            <p className="absolute left-1/2 bottom-1 text-text200">2</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full ">
          <img src={one} alt="two" />
          <p>{data[0].nickname}</p>
          <p className="text-sm text-text200">{data[0].score}점</p>
          <div className="relative w-full h-36 bg-text50 rounded-t-xl">
            <p className="absolute left-1/2 bottom-1 text-text200">1</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full ">
          <img src={three} alt="three" />
          <p>{data[2].nickname}</p>
          <p className="text-sm text-text200">{data[2].score}점</p>
          <div className="relative w-full h-12 bg-text50 rounded-t-xl">
            <p className="absolute left-1/2 bottom-1 text-text200">3</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RankTower;
