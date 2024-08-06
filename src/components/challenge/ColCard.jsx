import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { getImageById } from "../../utils/challengeImage";

const ColCard = ({ title, desc, start, end, id, status }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/challenge/${id}`, { state: { status } });
  };

  return (
    <section
      className="relative flex flex-col w-full gap-2 transition-all cursor-pointer hover:scale-95"
      onClick={handleNavigate}
    >
      {status === 1 && (
        <div className="absolute px-2 py-1 text-xs rounded-lg bg-text100 right-2 top-2">
          진행중
        </div>
      )}
      {status === 2 && (
        <div className="absolute px-2 py-1 text-xs rounded-lg bg-text100 right-2 top-2">
          완료
        </div>
      )}
      <img src={getImageById(id)} alt="dummy" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between w-full font-semibold">
          <p className="text-lg">{title}</p>
        </div>
        <p className="text-text400">{desc}</p>
        <p className="text-text150 text-">
          {format(new Date(start), "yyyy.MM.dd")}-
          {format(new Date(end), "yyyy.MM.dd")}
        </p>
      </div>
    </section>
  );
};

export default ColCard;
