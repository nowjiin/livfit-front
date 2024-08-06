const GroupButton = ({ selected, setSelected }) => {
  return (
    <div className="flex items-center justify-start w-[60%] gap-2 text-sm">
      <button
        onClick={() => setSelected("전체 배지")}
        className={`flex items-center justify-center w-full p-1 px-2 whitespace-nowrap ${
          selected === "전체 배지"
            ? "text-text50 bg-orange2"
            : "text-text100 bg-text50"
        }  rounded-[13px]`}
      >
        전체 배지
      </button>
      <button
        onClick={() => setSelected("목표 배지")}
        className={`flex items-center justify-center w-full p-1 px-2 whitespace-nowrap ${
          selected === "목표 배지"
            ? "text-text50 bg-orange2"
            : "text-text100 bg-text50"
        }  rounded-[13px]`}
      >
        목표 배지
      </button>
      <button
        onClick={() => setSelected("성공 배지")}
        className={`flex items-center justify-center w-full p-1 px-2 whitespace-nowrap ${
          selected === "성공 배지"
            ? "text-text50 bg-orange2"
            : "text-text100 bg-text50"
        }  rounded-[13px]`}
      >
        성공 배지
      </button>
    </div>
  );
};

export default GroupButton;
