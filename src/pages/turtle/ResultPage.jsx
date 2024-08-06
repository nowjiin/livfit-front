import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

import axios from "axios";

import { format } from "date-fns";
import { useSelector } from "react-redux";

//AI의 분석 결과 알려주는 div
import AISection from "./AISection";
import Loader from "./Loader";

//import TipSection from "@commons/TipSection";
import EffectText from "@components/commons/EffectText";
import GroupButton from "@components/turtle/GroupButton";
import Navbar from "@layouts/Navbar";

import clover_three from "@images/badge/clover_three.png";

const ResultPage = () => {
  const score = useSelector((state) => state.turtle.angle);
  const [showModal, setShowModal] = useState(false);
  //AI 분석 결과 상태 추가
  const [aiTip, setAiTip] = useState("");
  // 애니메이션용 텍스트(타이핑 애니메이션)
  const [displayedTip, setDisplayedTip] = useState("");
  //로더 상태
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkBadgeCondition = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          // Post 요청 ( 뱃지 획득 요청 )
          const response = await axios.post(
            `${
              import.meta.env.VITE_SERVER_BASE_URL
            }/api/userbadges/check-award`,
            {
              badgeId: "clover_three",
              conditionCheck: true,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          // 요청이 성공적으로 오면 모달 띄우기
          if (response.status === 200 && response.data.success) {
            setShowModal(true);
          } else {
            setShowModal(false);
          }
        } catch (error) {
          console.error("Error checking badge condition:", error);
          setShowModal(false);
        }
      }
    };

    checkBadgeCondition();

    //AI 분석 결과 알려주는 div 로직 추가
    const fetchAiTip = async () => {
      try {
        // 로딩 시작
        setLoading(true);

        // 점수에 따라 프롬프트 설정
        let prompt;
        if (score < 200) {
          prompt =
            "당신의 점수는 낮습니다. 거북목 예방을 위한 조언을 제공합니다.";
        } else if (score < 500) {
          prompt =
            "당신의 점수는 평균입니다. 거북목 개선을 위한 팁을 드리겠습니다.";
        } else if (score < 800) {
          prompt =
            "당신의 점수는 양호합니다. 바른 자세를 유지하기 위한 조언을 드립니다.";
        } else {
          prompt =
            "당신의 점수는 매우 좋습니다! 지속적으로 좋은 자세를 유지하세요.";
        }
        const response = await axios.post(
          // .env 파일에서 엔드포인트 가져오기
          import.meta.env.VITE_GENIEAI_API_ENDPOINT,
          {
            model: import.meta.env.VITE_LLAMA,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 150,
          },
          {
            headers: {
              "Content-Type": "application/json",
              // .env 파일에서 API 키 가져오기
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
            },
          }
        );

        if (response.data.choices && response.data.choices[0].message.content) {
          setAiTip(response.data.choices[0].message.content.trim()); // 받아온 데이터를 aiTip 상태에 저장
        } else {
          setAiTip("거북목을 예방하기 위해서는 바른 자세와 스트레칭 필수!"); // 기본 TIP 메시지
        }
      } catch (error) {
        console.error(
          "Error fetching tip:",
          error.response ? error.response.data : error.message
        );
        setAiTip("거북목을 예방하기 위해서는 바른 자세와 스트레칭 필수!"); // 에러 시 기본 메시지
      } finally {
        // 로딩 끝
        setLoading(false);
      }
    };
    // TIP 데이터 가져오기
    fetchAiTip();
  }, []); //userEffect 딱 한번만 실행

  // 타이핑 애니메이션
  useEffect(() => {
    // 인덱스 상태 변수
    let index = 0;

    // 타이핑 효과를 위한 setInterval
    const typingInterval = setInterval(() => {
      // 인덱스가 전체 텍스트 길이보다 작으면 글자 추가
      if (index < aiTip.length) {
        setDisplayedTip((prev) => prev + aiTip[index]);
        index++;
      } else {
        clearInterval(typingInterval); // 모든 글자가 표시되면 타이머 중지
      }
    }, 50); // 각 글자가 표시되는 간격 (밀리초)

    // 컴포넌트가 언마운트될 때 타이머를 정리
    return () => clearInterval(typingInterval);
  }, [aiTip]); // aiTip이 변경될 때마다 애니메이션 시작

  // 모달
  const renderModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">🎉축하합니다!🎉</h2>
        <p className="mb-6">새로운 배지를 얻었습니다 !</p>
        <img
          src={clover_three}
          alt="Clover Badge"
          className="mb-4 w-20 h-20 mx-auto"
        />

        <p className="mb-6">&quot;행운의 클로버 배지&quot;</p>

        <div className="flex justify-center px-5 text-sm text-center space-x-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-text50 text-text400 rounded border border-text400"
          >
            <p>닫기</p>
          </button>
          <button
            onClick={() => navigate("/badge")}
            className="px-4 py-2 bg-green-500 text-text50 rounded"
          >
            얻은 뱃지 보러가기
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full h-full overflow-auto bg-black">
      <Navbar closed turtle={format(new Date(), "yyyy-MM-dd")} />
      <section className="relative w-full mt-10 text-center text-text50">
        <div className="absolute z-10 w-full h-40 bg-center bg-no-repeat bg-cover top-10 bg-turtle_effect" />
        <EffectText text={score} turtle />
        <div className="px-8 mb-10">
          <p className="mb-2 font-semibold">오늘의 거북목 측정결과입니다!</p>
          <p className="mb-12 font-semibold">
            수시로 측정하여 바른 자세를 유지해보세요!
          </p>
          {loading ? ( // 로딩 중일 때 Loader 표시
            <Loader />
          ) : (
            <AISection
              tipColor="#00D26A"
              bgColor="#FFFFFF"
              prompt={displayedTip}
            />
          )}
        </div>
        <div className="w-full pb-10 mt-20">
          <GroupButton />
        </div>
      </section>
      {/* 상태에 따른 모달요청 */}
      {showModal && renderModal()}
    </div>
  );
};

export default ResultPage;
