const SelectedTerm = ({ term, choosed, selected, setSelected }) => {
  const clickHandler = () => {
    if (selected === term) {
      setSelected("");
    } else {
      setSelected(term);
    }
  };
  return (
    <p
      onClick={clickHandler}
      className={`${
        choosed ? "text-text50 bg-orange2" : "bg-[#F4F4F4] text-text400"
      } w-28 py-2 rounded-md cursor-pointer`}
    >
      {term}
    </p>
  );
};

export default SelectedTerm;
