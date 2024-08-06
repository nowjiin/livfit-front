import handshake from "@svgs/handshake.svg";
import { useNavigate } from "react-router-dom";

const Banner = ({ nickname }) => {
  const navigate = useNavigate();
  return (
    <section className="px-8 mt-6">
      {nickname ? (
        <div className="flex items-center gap-4 p-4 mb-4 rounded-xl bg-orange3 bg-opacity-15">
          <img src={handshake} alt="handshake" />
          <div className="w-full">
            <span className="flex items-center">
              <p>안녕하세요,</p>
              <p className="pl-2 text-orange">{nickname}</p>님
            </span>
            <p>오늘도 힘차게 미션을 달성해봐요!</p>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-full h-24 mb-4 rounrded-xl">
          <div className="absolute inset-0 bg-no-repeat bg-cover bg-blur_banner rounded-xl" />
          <section className="z-10">
            <button
              className="px-8 py-1 mt-2 transition-all border-2 border-orange2 text-text400 bg-text50 rounded-xl hover:opacity-50 "
              onClick={() => navigate("/auth/login")}
            >
              로그인 하러가기
            </button>
          </section>
        </div>
      )}
    </section>
  );
};

export default Banner;
