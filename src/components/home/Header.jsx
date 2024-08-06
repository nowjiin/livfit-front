import { useNavigate } from "react-router-dom";

import { BiLogIn, BiLogOut } from "react-icons/bi";

import badge from "@svgs/badge.svg";
import logo from "@svgs/logo.svg";

const Header = ({ isCurrentUser }) => {
  const logoutHandler = () => {
    if (
      localStorage.getItem("accessToken") ||
      localStorage.getItem("refreshToken")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/";
    }
  };

  const navigate = useNavigate();
  return (
    <header className="relative flex items-center justify-between w-full px-8 h-52 bg-gradient-triple">
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full h-full bg-center bg-no-repeat bg-contain bg-blur bg-main" />
      <img
        onClick={() => navigate("/badge")}
        src={badge}
        alt="Badge"
        className="z-10 transition-all cursor-pointer hover:opacity-50"
      />
      <img src={logo} alt="Logo" className="pl-7" />

      <div className="flex flex-col items-center">
        {isCurrentUser ? (
          <>
            <BiLogOut
              color="white"
              size={35}
              onClick={logoutHandler}
              className="z-10 cursor-pointer"
            />
            <span className="mt-0 text-xs text-white">LOGOUT</span>
          </>
        ) : (
          <>
            <BiLogIn
              color="white"
              size={35}
              onClick={() => navigate("/login")}
              className="z-10 cursor-pointer"
            />
            <span className="mt-0 text-xs text-white">LOGIN</span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
