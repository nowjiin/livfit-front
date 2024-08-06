import { format } from "date-fns";
import { ko } from "date-fns/locale";

import pencil from "@svgs/challenge/pencil.svg";

const Header = ({ count }) => {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <p className="mt-4 text-xl font-semibold">
          {format(new Date(), "M월 d일 EEEE", { locale: ko })} (오늘)
        </p>
        <p className="text-sm text-text200">
          현재 {count}개의 챌린지도 진행중이세요!
        </p>
      </div>
      <div className="flex items-center justify-center bg-[#C8C8C8] p-2 rounded-full">
        <img src={pencil} alt="pencil" />
      </div>
    </header>
  );
};

export default Header;
