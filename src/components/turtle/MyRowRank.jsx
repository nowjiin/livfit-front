import { useNavigate } from "react-router-dom";

import circleTurtle from "@svgs/turtle/circle-turtle.svg";
import nextArrow from "@svgs/turtle/orange-next-arrow.svg";

const MyRowRank = ({ data, userNickname }) => {
  const navigate = useNavigate();
  const userRecords = data.filter((d) => d.nickname === userNickname);

  const maxUserScore = Math.max(...userRecords.map((d) => d.score));

  const sortedData = [...data].sort((a, b) => b.score - a.score);
  const userRank =
    sortedData.findIndex(
      (d) => d.nickname === userNickname && d.score === maxUserScore
    ) + 1;

  return (
    <section
      className={`${
        userRank === 0 && "hidden"
      } flex items-center justify-between px-8 py-4 text-lg text-text400`}
    >
      <div className="flex items-center gap-3">
        <p>{userRank}등</p>
        <img src={circleTurtle} alt="circle-turtle" className="ml-4" />
        <p>{userNickname}</p>
      </div>
      <div className="flex items-center gap-3">
        <p>{maxUserScore}</p>
        <img
          src={nextArrow}
          alt="next-arrow"
          className="cursor-pointer"
          onClick={() => navigate("/turtle/my-ranking")}
        />
      </div>
    </section>
  );
};

export default MyRowRank;
