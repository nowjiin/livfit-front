const AISection = ({ prompt, tipColor, bgColor }) => {
  return (
    <div
      className={`px-4 py-2 w-full max-w-full md:max-w-[500px] h-[150px] ${
        bgColor ? "bg-white" : "bg-[#F7ECD1]"
      } border rounded-xl flex flex-col gap-2 md:gap-4 text-sm overflow-y-auto custom-scrollbar`}
    >
      <p
        className={`font-bold ${
          tipColor ? "text-[#00D26A]" : "text-orange2"
        } whitespace-nowrap flex-shrink-0 text-xs sm:text-sm`}
      >
        TIP!
      </p>
      <p className="text-[#595959] whitespace-normal break-words flex-1 text-sm sm:text-sm md:text-base">
        {prompt}
      </p>
    </div>
  );
};

export default AISection;
