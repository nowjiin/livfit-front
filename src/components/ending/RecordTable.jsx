import { timeFormat } from "@utils/timeFormat";

const RecordTable = ({ records }) => {
  return (
    <>
      <p className="mb-2 text-start">이전 기록</p>
      <table className="w-full table-fixed">
        <tbody>
          {records.map((record, index) => (
            <tr className="border-y-[1px] border-y-text50" key={index}>
              <td className="py-2 pl-2 text-left">
                {timeFormat(record.timer_sec, true)}
              </td>
              <td className="py-2 pl-2 text-left">{record.count}</td>
              <td className="flex items-center justify-center gap-2 py-2 pr-10 text-left">
                <span className="inline-block w-10 h-5 text-sm text-center bg-good rounded-xl">
                  {record.good}
                </span>
                <span className="inline-block w-10 h-5 text-sm text-center bg-great rounded-xl">
                  {record.great}
                </span>
                <span className="inline-block w-10 h-5 text-sm text-center bg-perfect rounded-xl">
                  {record.perfect}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RecordTable;
