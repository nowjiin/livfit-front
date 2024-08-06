import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

import { simplifyPoseLandmarks } from "@utils/mediapipe/calcAngle";
import updateLungeCount from "@utils/mediapipe/classifier/lunge.classifier";
import updatePushupCount from "@utils/mediapipe/classifier/pushup.classifier";
import updateSquatCount from "@utils/mediapipe/classifier/squat.classifier";
import config from "@utils/mediapipe/config";
import useDrawLandmarks from "@utils/mediapipe/useDrawLandmarks";

const WebCam = ({ start, setTimerStart, exercise, end, onReady }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null); // camera 객체를 참조할 변수
  const frameInterval = useRef(0);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const pose = config();
  const drawLandmarks = useDrawLandmarks();

  useEffect(() => {
    //카메라 먼저 시작 방지 코드 추가
    if (!start || isCameraReady) return;

    const initializeCamera = () => {
      // 비디오가 준비된 경우
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
        setTimerStart(true); // 웹캠이 켜지고 나서야 타이머 작동시키기
        cameraRef.current = camera; // camera 객체를 참조 변수에 저장
        //카메라 상태 업데이트
        setIsCameraReady(true);
        onReady(); // 카메라가 준비된 후 콜백 호출
      } else {
        // 비디오가 준비 안되었을 경우 대기
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
      }
    };

    pose.onResults(onResults);

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
      canvasCtx.save(); // canvas 드로잉 상태 저장
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      canvasCtx.drawImage(
        // results.image는 미디어파이프가 제공해주는 이미지
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (results.poseLandmarks) {
        drawLandmarks(
          canvasCtx,
          results.poseLandmarks,
          window.POSE_CONNECTIONS
        );
        // TODO: 아래 기능은 부위별 canvas 상에서의 상대 위치 및 가시 정도를 뽑아낸 후
        // 각 classifier별로 로직을 다르게 가져갑니다.
        const simplifiedLandmarks = simplifyPoseLandmarks(results);
        if (exercise) {
          switch (exercise) {
            case "squat":
              updateSquatCount(simplifiedLandmarks);
              break;
            case "lunge":
              updateLungeCount(simplifiedLandmarks);
              break;
            case "pushup":
              updatePushupCount(simplifiedLandmarks);
          }
        }
      }
      canvasCtx.restore(); // save했던 드로잉 상태를 복원
    }
  }, [start, isCameraReady, onReady]);

  useEffect(() => {
    if (end && cameraRef.current) {
      cameraRef.current.stop();
    }
  }, [end]);

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
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <section className="absolute text-5xl text-orange"></section>
    </div>
  );
};

export default WebCam;
