import emojiImage from "../assets/images/login/emoji.png";

const MyPageLoginModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full mx-4 text-center relative">
        <div className="absolute top-[-4rem] left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
            <img
              src={emojiImage}
              alt="emoji"
              className="w-36 h-28 relative left-4 top-[-10px]"
            />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-1 mt-10 text-black">
          기록을 원하시면 <span className="text-orange2">로그인</span>이
          필요해요!
        </h2>
        <p className="text-gray-500 mb-3">
          나만의 기록을 저장하고 분석할 수 있어요!
        </p>
        <div className="flex justify-around mt-4">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full mr-2 w-40"
            onClick={onClose}
          >
            다음에 기록할게요
          </button>
          <button
            className="bg-orange2 text-white px-4 py-2 rounded-full w-40"
            onClick={onLogin}
          >
            로그인 하러가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageLoginModal;
