const TipSection = ({ desc, tipColor, bgColor }) => {
  return (
    <div
      className={`px-4 py-2 w-full max-w-full md:max-w-[500px] ${
        bgColor ? "bg-white" : "bg-[#F7ECD1]"
      } border rounded-xl flex items-center gap-2 md:gap-4 text-sm`}
    >
      <p
        className={`font-bold ${
          tipColor ? "text-[#00D26A]" : "text-orange2"
        } whitespace-nowrap flex-shrink-0 text-xs sm:text-sm`}
      >
        TIP!
      </p>
      <p className="text-[#595959] whitespace-normal break-words flex-1 text-sm sm:text-sm md:text-base">
        {desc}
      </p>
    </div>
  );
};

export default TipSection;
