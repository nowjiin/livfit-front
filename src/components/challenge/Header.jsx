import Navbar from "@layouts/Navbar";

import chalText from "@images/challenge/chal.png";
import challengeText from "@images/challenge/challenge.png";
import lengeText from "@images/challenge/lenge.png";

const Header = () => {
  return (
    <header className="relative flex flex-col w-full gap-2 bg-no-repeat bg-contain bg-challenge">
      <Navbar isWhite closed />
      <img src={challengeText} className="h-20" />
      <img src={chalText} className="h-20 mr-60" />
      <img src={lengeText} className="h-20 ml-52" />
      <section className="absolute z-10 top-40 left-10 text-text50">
        <p className="text-3xl">챌린지</p>
        <h1 className="text-sm">
          사람들과 다같이 챌린지를 달성하여 습관을 만들어보세요!
        </h1>
      </section>
    </header>
  );
};

export default Header;
