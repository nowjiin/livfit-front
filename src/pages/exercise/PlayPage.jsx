import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { privateApi } from "@api/axios";

import PlayNavbar from "@layouts/PlayNavbar";

import CountTime from "@components/play/CountTime";
import GroupButton from "@components/play/GroupButton";
import RestScreen from "@components/play/RestScreen";
import Score from "@components/play/Score";
import Timer from "@components/play/Timer";
import WebCam from "@components/play/WebCam";

import { parsedPlay } from "@constants/parsedPlay";
import { timeStringToSeconds } from "@utils/timeFormat";

// 만약에 세트수가 2세트다 ?
// 3, 2, 1 -> start -> 설정한 playTime에 맞춰서 타이머 작동 그리고 playTime이 end가 되면
// restScreen 보여주기
// 그 후 다시 설정한 playTime에 맞춰서 타이머 작동 그리고 playTime이 end가 되면 결과페이지로 이동
// 즉슨, 제일 중요한 건 타이머는 세트 수에 맞게 그 수 만큼 동작

const PlayPage = () => {
  const exercise = useParams().exercise; // 어떤 운동인지 ? parameter값 가져오기 용도
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body) => privateApi.post(`/${exercise}/save_record`, body),
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });

  const playConfig = useSelector((state) => state.play);

  const [getStart, setGetStart] = useState(false); // 시작 타이머 용도
  const [timeLeft, setTimeLeft] = useState(3); // 카운트다운을 위해 3초로 설정
  const [showStart, setShowStart] = useState(false); // START 문구 보여주기용

  const [rest, setRest] = useState(false); // 잠시 쉬는화면 보여주기
  const [timeUp, setTimeUp] = useState(false); // 타이머 종료 용도
  const [currentSet, setCurrentSet] = useState(1); // 현재 세트 수 추적
  const [timerKey, setTimerKey] = useState(0); // 타이머를 리셋하기 위한 키

  const [cameraEnd, setCameraEnd] = useState(false); // 웹캠 카메라 end 시키기 위한 값
  const [webcamReady, setWebcamReady] = useState(false); // WebCam 컴포넌트의 상태저장

  // 웹캠이 준비되었을 때 호출되는 함수
  const handleWebCamReady = () => {
    setWebcamReady(true); // 웹캠이 준비되었음을 설정
  };

  // 데이터 저장 함수
  const saveData = () => {
    const dataToSend = {
      timer_sec: timeStringToSeconds(playConfig.playTime),
      exercise_set: Number(playConfig.goalSet.split("세트")[0]),
      count: playConfig.scoreArray.length,
      good: playConfig.scoreArray.filter((score) => score === "Good").length,
      great: playConfig.scoreArray.filter((score) => score === "Great").length,
      perfect: playConfig.scoreArray.filter((score) => score === "Perfect")
        .length,
    };

    console.log("Mutation data:", dataToSend); // 로그 추가

    mutation.mutate(dataToSend);
  };

  // 카메라 준비 상태에 따른 3, 2, 1 카운트다운 시작
  useEffect(() => {
    // 웹캠이 준비되지 않으면 대기
    if (!webcamReady) {
      return;
    }

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // 매초마다 남은 시간을 1씩 감소
      }, 1000);
      return () => clearInterval(timer);
    }

    if (timeLeft === 0) {
      // 카운트다운이 끝난 경우 START문구 표시
      setShowStart(true);
      setTimeout(() => {
        // 1초 후 'START' 문구 숨기기
        setShowStart(false);
        // 카운트다운 완료 후 운동 시작
        setGetStart(true);
      }, 1000);
    }
  }, [webcamReady, timeLeft]);

  // 세트가 끝났을 때 로직
  useEffect(() => {
    if (timeUp) {
      const goalSets = parseInt(playConfig.goalSet.split("세트")[0], 10);
      if (currentSet < goalSets) {
        // 목표 세트 수에 도달하지 못한 경우 휴식 화면 표시
        setRest(true);
        setTimeout(() => {
          // 휴식 화면 숨기기
          setRest(false);
          // 현재 세트 수 증가
          setCurrentSet((prevSet) => prevSet + 1);
          setTimeLeft(3); // 카운트다운 시간 초기화
          setTimeUp(false); // 타이머 종료 상태 리셋
          setGetStart(false); // 운동 상태 리셋
          setTimerKey((prevKey) => prevKey + 1); // 타이머 리셋을 위한 키 변경
        }, parseInt(playConfig.restTime.split("초")[0], 10) * 1000);
      } else if (currentSet === goalSets) {
        // 목표 세트 수에 도달한 경우
        saveData(); // 데이터 저장
        // 웹캠 종료
        setCameraEnd(true);
        // 결과 페이지로 이동
        navigate(`/${exercise}/result`);
      }
    }
  }, [timeUp, currentSet, playConfig, mutation, navigate, exercise]);

  return (
    <div className="relative">
      {timeLeft > 0 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70">
          <CountTime time={timeLeft} />
        </div>
      )}
      {rest && (
        <RestScreen
          restTime={playConfig.restTime.split("초")[0]}
          setRest={setRest}
          exercise={exercise}
        />
      )}

      <PlayNavbar title={parsedPlay(exercise)} closed styles rest={rest} />
      <WebCam
        start={true} // 카운트다운이 끝난 후 운동 시작
        setTimerStart={setGetStart} // 타이머 시작 상태 업데이트
        exercise={exercise} // 현재 운동 유형
        end={cameraEnd} // 웹캠 종료 상태
        onReady={handleWebCamReady} // 웹캠이 준비된 후 상태 업데이트
      />
      <main className="relative flex flex-col items-center justify-center w-full h-screen">
        <section className="absolute top-0">
          <Score />
        </section>
        {showStart && (
          <p className="absolute flex justify-center text-center top-[20%] text-text500 text-8xl font-Score">
            START
          </p>
        )}
        <section className="absolute flex flex-col justify-center w-full bottom-40">
          <Timer
            key={timerKey} // 타이머 리셋을 위해 키 설정
            start={getStart && !showStart}
            paused={rest}
            setTimeUp={setTimeUp}
            duration={playConfig.playTime}
          />
          <GroupButton rest={rest} setRest={setRest} />
        </section>
      </main>
    </div>
  );
};

export default PlayPage;
