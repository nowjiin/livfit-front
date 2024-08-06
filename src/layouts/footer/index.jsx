import { Outlet, useLocation } from "react-router-dom";

import home from "@svgs/footer/home.svg";
import live from "@svgs/footer/live.svg";
import profile from "@svgs/footer/profile.svg";
import store from "@svgs/footer/store.svg";
import turtle from "@svgs/footer/turtle.svg";

import selectedHome from "@svgs/footer/home-select.svg";
import selectedLive from "@svgs/footer/live-select.svg";
import selectedProfile from "@svgs/footer/profile-select.svg";
import selectedStore from "@svgs/footer/store-select.svg";
import selectedTurtle from "@svgs/footer/turtle-select.svg";

import CategoryBox from "./CategoryBox";

const Footer = () => {
  const pathname = useLocation().pathname;

  return (
    <>
      <Outlet />
      <footer className="fixed bottom-0 grid grid-cols-5 shadow-2xl place-items-center bg-text75 w-full max-w-[500px] z-50">
        <CategoryBox
          imageSrc={home}
          selectedImageSrc={selectedHome}
          title="홈"
          selected={pathname === "/" || pathname.includes("/tutorial")}
          url="/"
        />
        <CategoryBox
          imageSrc={live}
          selectedImageSrc={selectedLive}
          title="운동 측정"
          selected={pathname.includes("/exercise")}
          url="/exercise"
        />
        <CategoryBox
          imageSrc={turtle}
          selectedImageSrc={selectedTurtle}
          title="거북목<br>측정"
          selected={pathname.includes("/turtle")}
          url="/turtle"
        />
        <CategoryBox
          imageSrc={store}
          selectedImageSrc={selectedStore}
          title="스토어<br>(BETA)"
          selected={pathname.includes("/store")}
          url="/store"
        />
        <CategoryBox
          imageSrc={profile}
          selectedImageSrc={selectedProfile}
          title="마이"
          selected={pathname.includes("/profile")}
          url="/profile"
        />
      </footer>
    </>
  );
};

export default Footer;
