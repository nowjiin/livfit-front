import { useState } from "react";
import Modal from "react-modal";

import ShowBadge from "@commons/ShowBadge";
import { badgeArray } from "@constants/badgeArray";
import { badgeSelectModalStyle } from "@constants/badgeSelectModalStyle";

const BadgeSelectModal = ({
  modalOpen,
  setModalOpen,
  badges,
  selected,
  setSelected,
  submitHandler,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setIsClosing(false);
    }, 750);
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={handleClose}
      style={{
        ...badgeSelectModalStyle,
        content: {
          ...badgeSelectModalStyle.content,
          animation: isClosing
            ? "slideOut 0.75s forwards"
            : "slideIn 0.75s forwards",
          height: "auto",
          maxHeight: '1000px',
        },
      }}
      ariaHideApp={false}
      contentLabel="Pop up Message"
    >
      <div className="flex flex-col items-center w-full h-full">
        <p className="text-2xl mb-4">메인 배지 변경</p>
        <section className="flex flex-wrap items-center justify-center w-5/6 gap-8 py-3 mt-3">
          {badgeArray
            .filter((badge) => badges.includes(badge.name))
            .map((badge, index) => (
              <div
                className="flex flex-col items-center justify-center w-20"
                key={index}
              >
                <div
                  onClick={() => setSelected(badge.name)}
                  className={`text-center cursor-pointer transform transition-transform ${
                    selected === badge.name ? "scale-110" : ""
                  } hover:scale-105`}
                >
                  <ShowBadge name={badge.name} />
                  <p
                    className={`text-sm mt-2 ${
                      selected === badge.name
                        ? "text-orange2" // 선택된 뱃지의 텍스트 색상 변경
                        : "text-text400"
                    }`}
                  >
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
        </section>
        <button
          onClick={submitHandler}
          disabled={!selected}
          className="w-1/4 py-1 mt-9 rounded-lg disabled:bg-gray-500 text-text50 bg-orange2"
        >
          변경하기
        </button>
      </div>
    </Modal>
  );
};

export default BadgeSelectModal;
