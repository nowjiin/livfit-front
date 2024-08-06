import first from "@images/point/first.png";
import fourth from "@images/point/fourth.png";
import second from "@images/point/second.png";
import third from "@images/point/third.png";

import party from "@svgs/profile/party.svg";

import backArrow from "@svgs/left-arrow.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <img src={first} className="w-4/5 h-20" />
      <img src={second} className="h-20 ml-20" />
      <img src={third} className="h-20" />
      <img src={fourth} className="h-20 ml-10" />
      <img
        src={backArrow}
        className="absolute top-10 left-10"
        onClick={() => navigate(-1)}
      />
      <p className="absolute top-10 left-[43%] text-xl text-text500">포인트</p>
      <img src={party} alt="party" className="absolute top-[30%] left-[30%]" />
    </>
  );
};

export default Header;
