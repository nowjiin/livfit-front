import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import { privateApi, publicApi } from "@api/axios";

import { simplifyPoseLandmarks } from "@utils/mediapipe/calcAngle";
import detectTurtleNeck from "@utils/mediapipe/classifier/turtle.classifier";
import config from "@utils/mediapipe/config";
import useDrawLandmarks from "@utils/mediapipe/useDrawLandmarks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAngle } from "../../app/redux/slices/turtleSlice";
import SendNicknameModal from "./SendNicknameModal";

import faceMask from "@images/turtle/face-mask.png";

// WebCam 컴포넌트
const WebCam = ({ start, end, onReady }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const webcamRef = useRef(null); // 웹캠 요소 참조
  const canvasRef = useRef(null); // 캔버스 요소 참조
  const cameraRef = useRef(null); // 카메라 인스턴스 참조
  const frameInterval = useRef(0); // 프레임 간격 계산용 참조
  const [angles, setAngles] = useState([]); // 각도 데이터 상태
  const [nickname, setNickname] = useState(""); // 사용자 닉네임 상태
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태
  const [lastRecordedScore, setLastRecordedScore] = useState(null); // 마지막 기록된 점수 상태
  const [isCameraReady, setIsCameraReady] = useState(false); // 카메라 준비 상태

  const mutation = useMutation({
    mutationFn: async (body) => {
      try {
        if (localStorage.getItem("accessToken")) {
          await privateApi.post("/turtle/o/save_turtle_record", body);
          navigate("/turtle/result");
        }
      } catch (error) {
        setShowModal(true);
      }
    },
  });

  // 비회원 일 경우 닉네임 서버로 전송
  const handleNicknameSubmit = async (nickname) => {
    setShowModal(false);
    dispatch(setAngle({ angle: Number(lastRecordedScore) * 10 }));
    try {
      await publicApi.post("/turtle/x/save_turtle_record", {
        nickname,
        score: Number(lastRecordedScore) * 10,
        localDate: format(new Date(), "yyyy-MM-dd"),
      });
      navigate("/turtle/result");
    } catch (error) {
      console.error("Public API 요청 중 에러 발생:", error);
    }
  };

  // 포즈 감지 설정 및 랜드마크 그리기 설정
  const pose = config(); // MediaPipe 설정 초기화
  const drawLandmarks = useDrawLandmarks("all"); // 랜드마크 그리기 설정

  // 이미지 로드
  const image = new Image();
  image.src = faceMask;

  // 카메라 및 포즈 감지
  useEffect(() => {
    // 시작 상태 및 카메라 준비 상태 확인
    if (!start || isCameraReady) {
      return; // 시작 상태 및 카메라 준비 상태 확인
    }
    const initializeCamera = async () => {
      try {
        // 비디오가 이미 준비된 경우
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const camera = new window.Camera(webcamRef.current.video, {
            onFrame: async () => {
              frameInterval.current++;
              if (frameInterval.current % 4 === 0) {
                await pose.send({ image: webcamRef.current.video });
              }
            },
            width: 1280,
            height: 720,
          });

          camera.start();
          cameraRef.current = camera;
          setIsCameraReady(true);
          onReady(); // 카메라가 준비된 후 콜백 호출
        } else {
          // 비디오 준비가 안되었을 경우 대기
          webcamRef.current.video.onloadedmetadata = () => {
            const camera = new window.Camera(webcamRef.current.video, {
              onFrame: async () => {
                frameInterval.current++;
                if (frameInterval.current % 4 === 0) {
                  await pose.send({ image: webcamRef.current.video });
                }
              },
              width: 1280,
              height: 720,
            });

            camera.start();
            cameraRef.current = camera;
            setIsCameraReady(true);
            onReady(); // 카메라가 준비된 후 콜백 호출
          };
        } //여기 추가
      } catch (error) {
        alert("카메라 권한을 허용해주세요!");
        console.error("카메라 초기화 오류:", error);
        navigate(-1);
      }
    };

    pose.onResults(onResults); // MediaPipe 결과 처리 함수

    initializeCamera();

    return () => {
      if (cameraRef.current) {
        console.log("Stopping the camera...");
        cameraRef.current.stop();
      }
    };

    function onResults(results) {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");
      canvas.width = 1280;
      canvas.height = 720;
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.poseLandmarks) {
        drawLandmarks(
          canvasCtx,
          results.poseLandmarks,
          window.POSE_CONNECTIONS
        );
        const simplifiedLandmarks = simplifyPoseLandmarks(results);
        const angle = detectTurtleNeck(simplifiedLandmarks);
        setAngles((prevAngles) => [...prevAngles, angle]);

        //얼굴 위치에 이미지 덮어 씌우기 여기부터
        const noseLandmark = results.poseLandmarks[1]; // 코 끝부분의 랜드마크 인덱스는 1번입니다.
        if (noseLandmark) {
          const noseX = noseLandmark.x * canvas.width;
          const noseY = noseLandmark.y * canvas.height;
          //화면 이미지 크기 줄이려면 여기서 크기 조정 하면 됨 !
          const imageSize = 900; // 이미지 크기 설정
          // const imageSize = Math.min(canvas.width, canvas.height) * 0.3; // 화면 크기에 비례하여 이미지 크기 설정

          // 이미지 그리기
          canvasCtx.drawImage(
            image,
            noseX - imageSize / 2,
            noseY - imageSize / 2,
            imageSize,
            imageSize
          );
        }
        //여기까지 완료 검증된거임
      }
      canvasCtx.restore();
    }
  }, [start, isCameraReady, onReady]);

  useEffect(() => {
    if (end && cameraRef.current) {
      cameraRef.current.stop();
      if (angles.length > 0) {
        const avgAngle =
          angles.reduce((acc, val) => acc + val, 0) / angles.length;
        setLastRecordedScore(Number(avgAngle.toFixed(1)));

        if (localStorage.getItem("accessToken")) {
          dispatch(setAngle({ angle: Number(avgAngle.toFixed(1)) * 10 }));
          mutation.mutate({
            score: Number(avgAngle.toFixed(1)) * 10,
            localDate: format(new Date(), "yyyy-MM-dd"),
          });
        } else {
          setShowModal(true);
        }
      } else {
        console.log("No angles detected.");
      }
    }
  }, [angles, end]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Webcam
        ref={webcamRef}
        videoConstraints={{
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
          frameRate: { ideal: 30, max: 60 },
        }}
        style={{ display: "none" }}
        playsInline={true}
        autoPlay
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {showModal && (
        <SendNicknameModal
          enteredNickname={nickname}
          setEnteredNickname={setNickname}
          modalOpen={showModal}
          setModalOpen={setShowModal}
          submitHandler={handleNicknameSubmit}
        />
      )}
    </div>
  );
};

export default WebCam;
