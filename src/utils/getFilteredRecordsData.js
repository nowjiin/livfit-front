import { isAfter, subDays, subMonths } from "date-fns";

export function getFilteredRecordsData(data, sorted, term) {
  let records = [...data];
  const today = new Date();

  if (term === "1주일") {
    const oneWeekAgo = subDays(today, 7);
    records = records.filter((record) =>
      isAfter(new Date(record.created_at), oneWeekAgo)
    );
  }

  if (term === "1개월") {
    const oneMonthAgo = subMonths(today, 1);
    records = records.filter((record) =>
      isAfter(new Date(record.created_at), oneMonthAgo)
    );
  }

  if (term === "3개월") {
    const threeMonthsAgo = subMonths(today, 3);
    records = records.filter((record) =>
      isAfter(new Date(record.created_at), threeMonthsAgo)
    );
  }

  if (sorted === "최신순") {
    records.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  if (sorted === "과거순") {
    records.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  if (sorted === "높은 기록순") {
    records.sort((a, b) => b.count - a.count);
  }

  if (sorted === "낮은 기록순") {
    records.sort((a, b) => a.count - b.count);
  }

  return records;
}
