import { format } from "date-fns";

const RowCard = ({ date, title, desc, point, accPoint, type }) => {
  return (
    <section className="flex items-center justify-between">
      <div className="flex items-start gap-10">
        <p className="text-[#AFAFAF] text-sm">
          {format(new Date(date), "MM.dd")}
        </p>
        <div>
          <p className="text-lg text-text400">{title}</p>
          <p className="text-xs text-[#AFAFAF]">{desc}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p
          className={`text-lg ${
            type === "spend" ? "text-lightblue" : "text-orange2"
          }`}
        >
          {type === "spend"
            ? `-${point.toLocaleString()}`
            : point.toLocaleString()}
          P
        </p>
        <p className="text-xs text-[#AFAFAF]">{accPoint.toLocaleString()}P</p>
      </div>
    </section>
  );
};

export default RowCard;
