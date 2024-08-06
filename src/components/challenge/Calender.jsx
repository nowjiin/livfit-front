import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <div className="relative flex items-center text-lg font-semibold">
          <span>{format(currentMonth, "yyyy.MM", { locale: ko })}</span>
          <FaChevronDown
            className="ml-2 cursor-pointer"
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          />
          {isDatePickerOpen && (
            <DatePicker
              selected={currentMonth}
              onChange={(date) => {
                setCurrentMonth(date);
                setIsDatePickerOpen(false);
              }}
              showMonthYearPicker
              inline
              locale={ko}
              className="absolute mt-2 bg-white shadow-lg"
            />
          )}
        </div>
        <button
          onClick={() => navigate("/challenge")}
          className="px-2 py-1 text-sm text-white rounded-md bg-orange2"
        >
          전체 보기
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const date = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-sm font-medium text-center text-gray-500">
          {date[i]}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-1 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        days.push(
          isSameMonth(day, monthStart) ? (
            <div
              className={`p-2 w-10 h-10 flex items-center justify-center text-center cursor-pointer ${
                isSameDay(day, selectedDate)
                  ? "bg-orange2 text-white rounded-full"
                  : "text-gray-700"
              }`}
              key={day}
              onClick={() => setSelectedDate(cloneDay)}
            >
              <span className="inline-block">{formattedDate}</span>
            </div>
          ) : (
            <div className="w-10 h-10 p-2" key={day}></div>
          )
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div
          className="grid grid-cols-7 gap-1 my-4 place-items-center"
          key={day}
        >
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-md p-4 mx-auto">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
