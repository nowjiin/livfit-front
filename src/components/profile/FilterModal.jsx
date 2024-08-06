import { useState } from "react";
import Modal from "react-modal";

import DateInput from "@commons/DateInput";
import { filterModalStyle } from "@constants/filterModalStyle";

import dots from "@svgs/profile/color-dots.svg";
import SelectedSort from "./SelectedSort";
import SelectedTerm from "./SelectedTerm";

const FilterModal = ({
  modalOpen,
  setModalOpen,
  selectedSort,
  setSelectedSort,
  selectedTerm,
  setSelectedTerm,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setIsClosing(false);
    }, 750); // 닫힘 애니메이션 시간과 일치시킵니다.
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={handleClose}
      style={{
        ...filterModalStyle,
        content: {
          ...filterModalStyle.content,
          animation: isClosing
            ? "slideOut 0.75s forwards"
            : "slideIn 0.75s forwards",
        },
      }}
      ariaHideApp={false}
      contentLabel="Pop up Message"
    >
      <div className="flex flex-col items-center w-full h-full gap-4">
        <img src={dots} alt="dots" />
        <section className="flex flex-col items-start w-full gap-1 px-2">
          <p className="text-lg">정렬 선택</p>
          <div className="grid w-full grid-cols-4 gap-1 text-sm text-center place-items-center">
            <SelectedSort
              name="최신순"
              choosed={selectedSort === "최신순"}
              selected={selectedSort}
              setSelected={setSelectedSort}
            />
            <SelectedSort
              name="과거순"
              choosed={selectedSort === "과거순"}
              selected={selectedSort}
              setSelected={setSelectedSort}
            />
            <SelectedSort
              name="높은 기록순"
              choosed={selectedSort === "높은 기록순"}
              selected={selectedSort}
              setSelected={setSelectedSort}
            />
            <SelectedSort
              name="낮은 기록순"
              choosed={selectedSort === "낮은 기록순"}
              selected={selectedSort}
              setSelected={setSelectedSort}
            />
          </div>
        </section>

        <section className="flex flex-col items-start w-full gap-1 px-2 mt-4">
          <p className="text-lg">조회 기간</p>
          <div className="grid w-full grid-cols-3 gap-1 text-center place-items-center">
            <SelectedTerm
              term="1주일"
              choosed={selectedTerm === "1주일"}
              selected={selectedTerm}
              setSelected={setSelectedTerm}
            />
            <SelectedTerm
              term="1개월"
              choosed={selectedTerm === "1개월"}
              selected={selectedTerm}
              setSelected={setSelectedTerm}
            />
            <SelectedTerm
              term="3개월"
              choosed={selectedTerm === "3개월"}
              selected={selectedTerm}
              setSelected={setSelectedTerm}
            />
          </div>
          <div className="flex items-center justify-between w-full gap-1 mt-2">
            <DateInput date={new Date()} before={7} />
            <p>-</p>
            <DateInput date={new Date()} />
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default FilterModal;
