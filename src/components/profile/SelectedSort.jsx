const SelectedSort = ({ name, choosed, selected, setSelected }) => {
  const clickHandler = () => {
    if (name === selected) {
      setSelected("");
    } else {
      setSelected(name);
    }
  };
  return (
    <p
      onClick={clickHandler}
      className={`${
        choosed ? "text-text50 bg-orange2" : "bg-[#F4F4F4] text-text400"
      } w-20 py-2 rounded-md cursor-pointer`}
    >
      {name}
    </p>
  );
};

export default SelectedSort;
