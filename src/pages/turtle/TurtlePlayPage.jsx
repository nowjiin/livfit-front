import { useEffect, useState } from "react";

import CountTime from "@components/play/CountTime";
import WebCam from "@components/turtle/WebCam";
import Navbar from "@layouts/Navbar";

import trackingBar from "@images/turtle/bar.png";

const TurtlePlayPage = () => {
  const [timeLeft, setTimeLeft] = useState(3); // 카운트다운을 위해 3초로 설정
  const [showStart, setShowStart] = useState(false); // START 문구 보여주기용
  const [trackingLeft, setTrackingLeft] = useState(5); // 측정하는 시간을 5초로 설정
  const [timesUp, setTimesUp] = useState(false); // 측정 완료 상태
  const [webCamReady, setWebCamReady] = useState(false); // 웹캠 시작 상태

  const handleWebCamReady = () => {
    setWebCamReady(true); // 웹캠이 준비되었음을 설정
  };

  // 321카운트다운 타이머
  useEffect(() => {
    if (webCamReady && timeLeft > 0) {
      const startTimer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(startTimer);
    } else if (webCamReady && timeLeft === 0 && !showStart) {
      setShowStart(true);
      const showStartTimer = setTimeout(() => {
        setShowStart(false);
      }, 1000);

      return () => clearTimeout(showStartTimer);
    }
  }, [webCamReady, timeLeft, showStart]);

  // 거북목 측정 측정 타이머 (웹캠이 준비되고 카운트다운이 끝난 후 시작)
  useEffect(() => {
    if (webCamReady && timeLeft === 0 && trackingLeft > 0) {
      const trackingTimer = setInterval(() => {
        setTrackingLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(trackingTimer);
    } else if (trackingLeft === 0) {
      setTimesUp(true);
    }
  }, [webCamReady, timeLeft, trackingLeft]); // 웹캠 시작 상태와 측정 타이머의 종속성

  return (
    <div className="relative">
      {timeLeft > 0 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70">
          <CountTime time={timeLeft} />
        </div>
      )}
      <main className="relative flex flex-col items-center justify-center w-full h-screen">
        <div className="absolute top-[2%] w-full z-10">
          <Navbar closed turtle="거북목 측정" />
        </div>
        {showStart && (
          <p className="absolute flex justify-center text-center top-[40%] text-text500 text-8xl font-Score">
            START
          </p>
        )}
        <WebCam start={true} end={timesUp} onReady={handleWebCamReady} />{" "}
      </main>
      {webCamReady && trackingLeft > 0 && (
        <div className="absolute inset-0">
          <img
            src={trackingBar}
            alt="track-bar"
            className="z-50 w-2/3 translate-y-1/3 translate-x-1/4 h-2/3"
          />
        </div>
      )}
    </div>
  );
};

export default TurtlePlayPage;
