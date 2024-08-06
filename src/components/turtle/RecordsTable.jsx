import { format } from "date-fns";
import { Fragment } from "react";

import one from "@svgs/home/one.svg";
import three from "@svgs/home/three.svg";
import two from "@svgs/home/two.svg";

const RecordsTable = ({ records }) => {
  // 점수 기준으로 records 배열 내림차순 정렬
  const sortedRecords = [...records].sort((a, b) => b.score - a.score);

  return (
    <section className="h-full">
      <div className="flex items-center w-full text-sm text-[#9C9C9C] mb-2">
        <p className="pl-36">랭킹</p>
        <p className="pl-32">각도</p>
        <p className="pl-14">점수</p>
      </div>
      <table className="min-w-full">
        <tbody>
          {sortedRecords.map((record, index) => (
            <Fragment key={index}>
              <tr className="bg-white">
                <td className="text-center py-6 text-[#9C9C9C] text-xs pl-4">
                  {format(new Date(record.localDate), "MM.dd")}
                </td>
                {/* <td className="py-6 pl-4 pr-8 text-center">{index + 1}</td> */}
                <td className="py-6 pl-4 pr-8 text-center place-content-center flex justify-center items-center">
                  {index + 1 === 1 ? (
                    <img src={one} alt="one" />
                  ) : index + 1 === 2 ? (
                    <img src={two} alt="two" />
                  ) : index + 1 === 3 ? (
                    <img src={three} alt="three" />
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="py-6 pl-6 text-center w-fit">
                  {(record.score / 10).toFixed(1)}°
                </td>
                <td className="py-6 pl-2 pr-8">{record.score}</td>
              </tr>
              {index < sortedRecords.length - 1 && (
                <tr>
                  <td colSpan="5" className="py-2"></td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecordsTable;
