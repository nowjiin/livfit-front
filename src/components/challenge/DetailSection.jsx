import { format } from "date-fns";
import { useParams } from "react-router-dom";

import RenderStar from "./RenderStar";
import { getImageById } from "../../utils/challengeImage";
import calendar from "@svgs/challenge/calendar.svg";
import certiSrc from "@svgs/challenge/certificate.svg";
import crown from "@svgs/challenge/crown.svg";

const DetailSection = ({
  title,
  desc,
  difficulty,
  reward,
  start,
  end,
  certificate,
}) => {
  const { id } = useParams(); // URL에서 ID를 추출

  return (
    <div className="w-full h-full">
      <img src={getImageById(id)} alt="big-dummy" className="w-full h-50" />
      <section className="flex flex-col items-center gap-2 mt-9 font-semibold">
        <p className="text-[#8F8F8F] text-sm">{title}</p>
        <p className="text-xl text-text400">{desc}</p>
        <div className="flex items-center justify-center">
          <RenderStar difficulty={difficulty} />
        </div>
        <section className="flex items-center gap-12 bg-[#E9E9E9] p-6 w-full rounded-xl mt-4">
          <div className="flex items-center gap-1">
            <img src={crown} alt="crown" className="mb-1" />
            <p>챌린지 달성 시 혜택</p>
          </div>
          <p className="font-medium text-[#626262]"> · {reward}</p>
        </section>

        <section className="flex flex-col w-full gap-6 p-6 mt-4 mb-12 text-sm clear-start bg-text50 rounded-xl text-text400">
          <div className="flex items-center gap-5">
            <img src={calendar} alt="calendar" />
            <p>
              {format(new Date(start), "yyyy.MM.dd")} ~{" "}
              {format(new Date(end), "yyyy.MM.dd")}
            </p>
          </div>
          <div className="flex items-start gap-5">
            <img src={certiSrc} alt="certificate" />
            <div className="flex flex-col">
              <p>인증하기</p>
              <p>{certificate}</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default DetailSection;
