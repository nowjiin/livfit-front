import { resetCounter } from "@redux/slices/playSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GroupButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exitHandler = () => {
    dispatch(resetCounter());
    navigate("/");
  };

  const restartHandler = () => {
    dispatch(resetCounter());
    navigate(-1);
  };

  return (
    <div className="grid items-center w-full grid-cols-2 gap-4 px-10 text-xl text-center">
      <div
        className="py-3 rounded-xl bg-text50 text-text400"
        onClick={exitHandler}
      >
        <p>나가기</p>
      </div>
      <div
        className="py-3 rounded-xl bg-orange2 text-text50"
        onClick={restartHandler}
      >
        <p>다시하기</p>
      </div>
    </div>
  );
};

export default GroupButton;
