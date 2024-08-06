import { useState } from "react";
import { resetAngle } from "@redux/slices/turtleSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyPageLoginModal from "../../constants/loginModal.jsx";

const GroupButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [handler, setHandler] = useState(null);

  const myHandler = () => {
    dispatch(resetAngle());
    navigate("/turtle/my-ranking");
  };

  const allHandler = () => {
    dispatch(resetAngle());
    navigate("/turtle/ranking");
  };

  const handleClick = (selectedHandler, requiresAuth = true) => {
    const token = localStorage.getItem("accessToken");
    if (token || !requiresAuth) {
      selectedHandler();
    } else {
      setHandler(() => selectedHandler);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="grid items-center w-full grid-cols-2 gap-4 px-10 text-sm text-center">
      <div
        className="py-3 cursor-pointer rounded-xl bg-text50 text-text400"
        onClick={() => handleClick(myHandler)}
      >
        <p>내 결과 보러가기</p>
      </div>
      <div
        className="py-3 cursor-pointer rounded-xl bg-orange2 text-text50"
        onClick={() => handleClick(allHandler, false)}
      >
        <p>전체 랭킹 보러가기</p>
      </div>
      <MyPageLoginModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default GroupButton;
