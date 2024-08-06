import { useNavigate } from "react-router-dom";

const RecordSection = ({ itemSrc, name, url }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${url}`)}
      className="flex flex-col items-center justify-center w-full gap-1 py-2 cursor-pointer rounded-xl bg-text50"
    >
      <img src={itemSrc} alt={itemSrc} className="mb-0.5" /> {/* 이미지 하단 마진 추가 */}
      <p className="text-sm text-text200 mt-1">{name}</p> {/* 텍스트 상단 마진 추가 */}
    </div>
  );
};

export default RecordSection;
