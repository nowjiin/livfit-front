import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { privateApi } from "@api/axios";

import BottomTab from "@components/challenge/bottomTab";
import Calendar from "@components/challenge/Calender";
import Navbar from "@layouts/Navbar";

const MyChallengePage = () => {
  const { data: challenges } = useQuery({
    queryKey: ["challenge", "user"],
    queryFn: () => privateApi.get("/challenge/user").then((res) => res.data),
  });

  const [goup, setGoup] = useState(false);

  const upDownHandler = () => {
    setGoup(!goup);
  };

  return (
    <div className="bg-[#F6F6F6] h-screen relative">
      <Navbar />
      <div className="px-8 pt-6">
        <p className="text-3xl">챌린지 달성률</p>
        <h1 className="mt-2 text-xs text-text200">
          챌린지를 달성할수록 업그레이드 된 배지를 획득할 수 있어요
        </h1>
      </div>
      <Calendar />
      {challenges && challenges.length > 0 && (
        <BottomTab
          goup={goup}
          upDownHandler={upDownHandler}
          data={challenges}
        />
      )}
    </div>
  );
};

export default MyChallengePage;
