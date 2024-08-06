import { parsedPlay } from "@constants/parsedPlay";

const SelectEx = ({ name, selected, setSelected }) => {
  return (
    <p
      className={`rounded-[39px] ${
        selected ? "bg-orange2 text-text50" : "bg-[#E6E6E6] text-[#B0B0B0]"
      } w-32 py-[6px] text-center cursor-pointer`}
      onClick={() => setSelected(name)}
    >
      {parsedPlay(name)}
    </p>
  );
};

export default SelectEx;
