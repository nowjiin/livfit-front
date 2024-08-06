const BallonText = ({ children }) => {
  return (
    <div className="relative max-w-xs px-2 py-1 mx-auto font-semibold text-xs text-text50 bg-yellow rounded-[51px]">
      {children}
      <div className="absolute bottom-0 w-0 h-0 transform -translate-x-1/2 border-t-8 border-l-8 border-r-8 translate-y-[95%] left-1/2 border-l-transparent border-r-transparent border-t-yellow"></div>
    </div>
  );
};

export default BallonText;
