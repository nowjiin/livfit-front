import { format } from "date-fns";
import { Fragment } from "react";

import { timeFormat } from "@utils/timeFormat";

const RecordsTable = ({ records }) => {
  return (
    <section className="h-full">
      <div className="flex items-center w-full text-sm text-[#9C9C9C] mb-2">
        <p className="pl-[86px]">세트</p>
        <p className="pl-10">시간</p>
        <p className="pl-12">개수</p>
        <p className="pl-[120px]">정확도</p>
      </div>
      <table className="min-w-full">
        <tbody>
          {records.map((record, index) => (
            <Fragment key={index}>
              <tr className="bg-white">
                <td className="text-center px-4 py-4 text-[#9C9C9C] text-xs">
                  {format(new Date(record.created_at), "MM.dd")}
                </td>
                <td className="px-4 py-4 text-center ">
                  {record.exercise_set}set
                </td>
                <td className="py-4 pl-4 pr-6 text-center">
                  {timeFormat(record.timer_sec || 0, true)}
                </td>
                <td className="px-4 py-4 text-center">{record.count}</td>
                <td className="py-4 pl-5 text-center">
                  <div className="flex space-x-2">
                    <span className="w-16 py-1 text-green-800 bg-good rounded-[41px]">
                      {record.good}
                    </span>
                    <span className="w-16 py-1 text-purple-800 bg-great rounded-[41px]">
                      {record.great}
                    </span>
                    <span className="w-16 py-1 text-red-800 bg-perfect rounded-[41px]">
                      {record.perfect}
                    </span>
                  </div>
                </td>
              </tr>
              {index < records.length - 1 && (
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
