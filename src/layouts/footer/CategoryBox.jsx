import { useNavigate } from "react-router-dom";

export default function CategoryBox({
  selected,
  imageSrc,
  selectedImageSrc,
  title,
  url,
}) {
  const navigate = useNavigate();

  // 텍스트에 "거북목"이 포함되어 있는지 확인
  const isSpecialTitle = title.includes("거북목")|| title.includes("스토어");

  const titleLines = title.split("<br>").map((line, index) => (
    <span key={index} className={isSpecialTitle ? "block leading-tight" : ""}>
      {line}
    </span>
  ));

  return (
    <section
      className="flex flex-col items-center justify-center p-4 text-center transition-all cursor-pointer hover:opacity-50"
      onClick={() => navigate(url)}
    >
      <img
        src={`${selected ? selectedImageSrc : imageSrc}`}
        alt={imageSrc}
        className={isSpecialTitle ? "mb-1" : ""}
      />
      <p className={`${selected ? "text-orange" : "text-text80"} text-[10px]`}>
        {titleLines}
      </p>
    </section>
  );
}
