import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraphComponent = ({ graph }) => {
  // 데이터 그룹화 및 합산
  const aggregatedData = graph.reduce((acc, item) => {
    const date = format(new Date(item.createdAt), "yyyy-MM-dd"); // 날짜 형식 통일
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += item.today_counts;
    return acc;
  }, {});

  // 날짜 순으로 정렬된 라벨과 데이터 생성
  const sortedDates = Object.keys(aggregatedData).sort();
  const labels = sortedDates.map((date) => format(new Date(date), "MM.dd"));
  const dataValues = sortedDates.map((date) => aggregatedData[date]);

  const data = {
    labels,
    datasets: [
      {
        label: "개수",
        data: dataValues,
        backgroundColor: dataValues.map((_, index) =>
          index === dataValues.length - 1
            ? "rgba(255, 159, 64, 0.8)"
            : "rgba(255, 206, 86, 0.6)"
        ),
        borderColor: dataValues.map((_, index) =>
          index === dataValues.length - 1
            ? "rgba(255, 159, 64, 1)"
            : "rgba(255, 206, 86, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const createdAt = sortedDates[index];
            return format(new Date(createdAt), "MM월 dd일 (eee)", {
              locale: ko,
            });
          },
          label: (tooltipItem) => {
            const count = tooltipItem.raw;
            return ` ${count}개`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false, // x축 레이블 숨기기
      },
      y: {
        beginAtZero: true,
        max: 30,
        ticks: {
          stepSize: 15,
          align: "end", // y축 레이블을 오른쪽으로 이동
        },
      },
    },
  };

  return (
    <div className="w-full mt-8">
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraphComponent;
