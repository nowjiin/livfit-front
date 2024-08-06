import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { privateApi } from "@api/axios";

import RecordsTable from "@components/profile/RecordsTable";
import { getFilteredRecordsData } from "@utils/getFilteredRecordsData";

const ShowAllRecords = ({ exercise, sort, term }) => {
  const [recordsData, setRecordsData] = useState([]);

  const { data: records } = useQuery({
    queryKey: ["exercise", "profile", exercise],
    queryFn: () =>
      privateApi.get(`/${exercise}/get_my_record`).then((res) => res.data),
  });

  useEffect(() => {
    if (records) {
      const filteredData = getFilteredRecordsData(records, sort, term);
      setRecordsData(filteredData);
    }
  }, [records, sort, term]);

  if (records && records.length === 0) {
    return <p>측정된 운동 기록이 없습니다.</p>;
  } else {
    return (
      <section className="overflow-y-hidden scroll-smooth h-100 custom-scrollbar">
        <RecordsTable records={recordsData} />
      </section>
    );
  }
};

export default ShowAllRecords;
