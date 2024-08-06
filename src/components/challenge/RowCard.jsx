import { getImageById } from "../../utils/challengeImage";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RowCard = ({ id, title, desc, start, end, status }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setCurrentUser(true);
    }
  }, []);

  return (
    <div
      className="relative w-[261px] h-[136px] rounded-[13px] shrink-0 hover:scale-95 transition-all cursor-pointer"
      onClick={() => navigate(`/challenge/${id}`)}
    >
      <img src={getImageById(id)} alt="dummy" className="absolute inset-0 w-full h-full object-cover rounded-[13px]" />
      <section className="absolute top-2 left-2">
        <p className="text-xs text-text50">
          {format(new Date(start), "yyyy.MM.dd")}~
          {format(new Date(end), "yyyy.MM.dd")}
        </p>
      </section>
      {currentUser && (
        <>
          {status === 1 && (
            <div className="absolute px-2 py-1 text-xs rounded-lg bg-text100 right-2 top-2">
              진행중
            </div>
          )}
          {status === 2 && (
            <div className="absolute inset-0 rounded-[13px] bg-gray-200 opacity-50" />
          )}
        </>
      )}
      <section className="absolute bottom-4 right-4 text-text50 text-end">
        <p className="text-sm">{title}</p>
        <p>{desc}</p>
      </section>
    </div>
  );
};

export default RowCard;
