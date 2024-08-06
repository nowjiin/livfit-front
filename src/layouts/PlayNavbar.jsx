import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { resetCounter } from "@redux/slices/playSlice";

import close from "@svgs/close.svg";
import backArrow from "@svgs/left-arrow.svg";
import lightClose from "@svgs/light-close.svg";
import lightBackArrow from "@svgs/light-left-arrow.svg";

// 이때 closed는 boolean으로 닫기창이 필요한 네비게이션바일 경우
// closed를 props로 부여합니다.
// styles같은 경우엔 play 페이지에서는 title에 별도의 style이 적용이 되어있습니다. (boolean값))
// rest는 쉬는 화면 나오게 하기 위한 boolean으로 이때 z-index를 부여합니다.
const PlayNavbar = ({ notPrev, title, closed, styles, rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backHandler = () => {
    dispatch(resetCounter());
    navigate(-1);
  };

  const closeHandler = () => {
    dispatch(resetCounter());
    navigate("/");
  };

  return (
    <>
      <nav
        className={`${
          closed ? "relative justify-between" : "justify-center"
        } flex items-center pt-10 px-10 pb-4 bg-transparent z-10`}
      >
        {!notPrev && rest && (
          <img
            src={lightBackArrow}
            alt={backArrow}
            onClick={backHandler}
            className={`${!closed && "absolute top-12 left-10"} z-10`}
          />
        )}
        {!notPrev && !rest && (
          <img
            src={backArrow}
            alt={backArrow}
            onClick={backHandler}
            className={`${!closed && "absolute top-12 left-10"}`}
          />
        )}
        <p
          className={`text-3xl text-text500 z-10 ${
            styles && "text-center bg-text100 text-lg w-60 p-2 rounded-[82px]"
          }`}
        >
          {title}
        </p>

        {closed && !rest && (
          <img src={close} alt={close} onClick={closeHandler} />
        )}
        {closed && rest && (
          <img
            src={lightClose}
            alt={close}
            onClick={closeHandler}
            className="z-10"
          />
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default PlayNavbar;
