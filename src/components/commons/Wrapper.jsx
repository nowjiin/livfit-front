const Wrapper = ({ children }) => {
  return (
    <div className="flex items-center justify-center overflow-y-auto">
      <div className="max-w-[500px] w-full h-full bg-text90">{children}</div>
    </div>
  );
};

export default Wrapper;
