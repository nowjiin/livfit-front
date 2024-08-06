import { useRef } from "react";

const DateInput = ({ date, before = 0 }) => {
  const dateInputRef = useRef(null);

  // 현재 날짜 또는 지정된 일수 이전 날짜를 'YYYY-MM-DD' 형식으로 반환하는 함수
  const getFormattedDate = (date, before) => {
    const targetDate = new Date(date);
    targetDate.setDate(targetDate.getDate() - before);
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더합니다.
    const day = String(targetDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleFocus = () => {
    dateInputRef.current.showPicker(); // 날짜 선택 창을 강제로 표시
  };

  return (
    <input
      ref={dateInputRef}
      className="w-full border-2 border-[#E0E0E0] rounded-md py-1 outline-none pl-4 text-sm"
      type="date"
      defaultValue={getFormattedDate(date, before)} // 기본값을 지정된 날짜로 설정
      onFocus={handleFocus} // 포커스 시 날짜 선택 창을 열기
    />
  );
};

export default DateInput;
