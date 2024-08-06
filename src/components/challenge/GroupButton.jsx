const GroupButton = ({ handler }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <button
        className="w-[80%] px-6 py-4 text-text50 bg-orange2 rounded-xl hover:opacity-80 transition-all"
        onClick={handler}
      >
        참여하기
      </button>
    </div>
  );
};

export default GroupButton;
