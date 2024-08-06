import whiteChecked from "@svgs/white-checked.svg";

// TODO: 1 -> 성공 (체크표시) 0 -> 시작 전 2-> 실패

const DayCard = ({ day, status }) => {
  return (
    <div className="flex flex-col items-center gap-2 font-semibold">
      <div>
        <span className="text-text200">{day}</span>
      </div>
      <div
        className={`relative w-11 h-11 rounded-full ${
          status === 1
            ? "bg-orange2"
            : status === 0
            ? "bg-text100"
            : "bg-text200"
        } bg-orange2`}
      >
        {status === 1 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={whiteChecked} alt="checked" />
          </div>
        )}
      </div>
      <p className="text-sm text-text150">
        {status === 1 ? "완료" : status === 0 ? "예정" : "실패"}
      </p>
    </div>
  );
};

export default DayCard;
