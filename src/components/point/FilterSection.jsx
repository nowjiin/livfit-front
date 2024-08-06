import downArrow from "@svgs/profile/down-arrow.svg";
import search from "@svgs/profile/search.svg";

const FilterSection = () => {
  return (
    <div className="flex items-center justify-between">
      <img src={search} alt="search" />
      <div className="flex items-center gap-2">
        <p className="text-[#AFAFAF] text-sm">전체</p>
        <img src={downArrow} alt="down-arrow" />
      </div>
    </div>
  );
};

export default FilterSection;
