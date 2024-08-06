import dotGroupSrc from "@svgs/challenge/dots.svg";
import underArrowSrc from "@svgs/store/under-arrow.svg";

const FilterSection = () => {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-text75 rounded-2xl">
        <img src={underArrowSrc} alt="under-arrow" />
        <p className="text-sm text-text200">추천순</p>
      </div>
      <img src={dotGroupSrc} alt="dots" />
    </div>
  );
};

export default FilterSection;
