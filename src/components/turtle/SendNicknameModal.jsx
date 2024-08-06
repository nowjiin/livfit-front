import { useState } from "react";
import Modal from "react-modal";

import { nicknameModalStyle } from "@constants/nicknameModalStyle";

import close from "@svgs/close.svg";

const SendNicknameModal = ({
  enteredNickname,
  setEnteredNickname,
  modalOpen,
  setModalOpen,
  submitHandler,
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
        ...nicknameModalStyle,
        content: {
          ...nicknameModalStyle.content,
          animation: isClosing
            ? "slideOut 0.75s forwards"
            : "slideIn 0.75s forwards",
        },
      }}
      ariaHideApp={false}
      contentLabel="Pop up Message"
    >
      <div className="relative flex flex-col items-start justify-center w-full h-full gap-3">
        <img src={close} alt="close" className="absolute right-2 top-2" />

        <p className="text-xl text-text400">
          기록 입력할 닉네임을 입력해주세요!
        </p>
        <p className="text-sm text-text200">
          영상은 절대 서버에 저장되지 않습니다!
        </p>
        <input
          placeholder="기록될 닉네임을 입력해주세요"
          value={enteredNickname}
          onChange={(e) => setEnteredNickname(e.target.value)}
          className="w-full p-4 text-sm shadow-lg outline-none rounded-xl bg-text90 text-[#BDBDBD]"
        />
        <button
          className="w-full rounded-[74px] text-text50 bg-orange2 py-2"
          onClick={() => submitHandler(enteredNickname)}
        >
          결과 보러 가기
        </button>
      </div>
    </Modal>
  );
};

export default SendNicknameModal;
