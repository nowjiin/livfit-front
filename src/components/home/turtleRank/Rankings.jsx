import { publicApi } from "@api/axios";
import { useQuery } from "@tanstack/react-query";

import turtleImage from "@images/turtle.png";
import one from "@svgs/home/one.svg";
import three from "@svgs/home/three.svg";
import two from "@svgs/home/two.svg";
import { truncate } from "@utils/truncate";

const Rankings = () => {
  const { data: turtleRecords } = useQuery({
    queryKey: ["turtle"],
    queryFn: () => publicApi("/turtle/all-records"),
  });

  let content;

  if (turtleRecords) {
    const sortedRecords = turtleRecords.data.sort((a, b) => b.score - a.score);
    content = (
      <>
        <div className="relative flex items-center rounded-[46px] bg-[#FFDB63] w-[90%] py-1">
          <img src={one} alt="one" className="absolute left-0" />
          <p className="ml-10 text-sm">
            {truncate(sortedRecords[0].nickname, 9)}
          </p>
        </div>
        <div className="relative flex items-center rounded-[46px] bg-[#FFECAD] w-[60%] py-1">
          <img src={two} alt="two" className="absolute left-0" />
          <p className="ml-10 text-sm">
            {truncate(sortedRecords[1].nickname, 5)}
          </p>
        </div>
        <div className="relative flex items-center rounded-[46px] bg-[#FFF2C6] w-[50%] py-1">
          <img src={three} alt="three" className="absolute left-0" />
          <p className="ml-10 text-sm">
            {truncate(sortedRecords[2].nickname, 3)}
          </p>
        </div>
      </>
    );
  }

  return (
    <section className="relative flex flex-col w-full gap-2 mt-4">
      {content}
      <img
        src={turtleImage}
        alt="turtle-image"
        className="absolute bottom-0 -right-2"
      />
    </section>
  );
};

export default Rankings;
