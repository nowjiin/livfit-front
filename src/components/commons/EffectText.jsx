const EffectText = ({ text, isBreak, turtle }) => {
  if (turtle) {
    return (
      <span
        className="
      turtle-effect text-[150px] font-GameNumber text-center"
        data-text={text}
      >
        {text}
      </span>
    );
  }

  return (
    <span
      className={`${
        isBreak ? "break-effect" : "no-break-effect"
      } text-[150px] font-GameNumber`}
      data-text={text}
    >
      {text}
    </span>
  );
};

export default EffectText;
