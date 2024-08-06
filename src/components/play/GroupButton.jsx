import exchange from "@svgs/exchange.svg";
import locker from "@svgs/locker.svg";

const GroupButton = ({ rest, setRest }) => {
  return (
    <section
      className={`flex items-center justify-between px-12 ${rest && "z-10"}`}
    >
      <div
        className="w-[59px] h-[59px] rounded-full bg-text150 flex items-center justify-center"
        onClick={() => setRest(!rest)}
      >
        <img src={locker} alt="locker" />
      </div>
      <div className="w-[78px] h-[78px] border-[6px] rounded-full border-text500 flex items-center justify-center bg-lightblue">
        <div className="w-[57px] h-[57px] border rounded-full border-text500"></div>
      </div>
      <div className="w-[59px] h-[59px] rounded-full bg-text150 flex items-center justify-center">
        <img src={exchange} alt="exchange" />
      </div>
    </section>
  );
};

export default GroupButton;
