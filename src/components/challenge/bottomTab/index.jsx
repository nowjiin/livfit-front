import ProgressBar from "@commons/ProgressBar";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import RowCard from "../RowCard";
import Header from "./Header";

const BottomTab = ({ goup, upDownHandler, data }) => {
  return (
    <div
      className={`
    ${goup ? "h-[60%]" : "h-32"}
    absolute bottom-0 left-0 right-0 z-10 w-full py-3 bg-text50 rounded-tl-[20px] rounded-tr-[20px] opacity-95 transition-all transform duration-1000 overflow-y-auto custom-scrollbar
  `}
    >
      <div className="flex flex-col items-center">
        {goup ? (
          <MdKeyboardArrowDown
            size={30}
            onClick={upDownHandler}
            className="text-center cursor-pointer animate-bounce"
          />
        ) : (
          <MdKeyboardArrowUp
            size={30}
            onClick={upDownHandler}
            className="text-center cursor-pointer animate-bounce"
          />
        )}
        <div className="w-full px-8">
          <Header count={data.length} />
          <ProgressBar
            totalStep={data.length}
            step={data.filter((d) => d.status === 1).length}
          />
          <section className="flex w-full gap-4 overflow-x-auto scroll-smooth custom-scrollbar">
            {data.map((d, index) => (
              <RowCard
                key={index}
                id={d.id}
                title={d.title}
                desc={d.description}
                start={d.startDate}
                end={d.endDate}
                status={d.status}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default BottomTab;
