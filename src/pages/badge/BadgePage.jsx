import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { privateApi } from "@api/axios";

import Contents from "@components/badge/Contents";
import Header from "@components/badge/Header";
import LoginModalNoToken from "../../constants/loginModalNoToken";

const BadgePage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(!accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      setIsModalOpen(true);
    }
  }, [accessToken]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const [selectedBadge, setSelectedBadge] = useState("성공 배지");
  const results = useQueries({
    queries: [
      {
        queryKey: ["profile", "badge"],
        queryFn: () =>
          privateApi
            .get("/mypage/badges/main")
            .then((response) => response.data),
        enabled: !!accessToken,
      },
      {
        queryKey: ["profile", "myBadge"],
        queryFn: () =>
          privateApi
            .get("/userbadges/mybadge")
            .then((response) => response.data),
        enabled: !!accessToken,
      },
    ],
  });

  const [mainBadge, allBadges] = results;

  let content;

  if (mainBadge.isLoading || allBadges.isLoading) {
    content = <div>Loading...</div>;
  } else if (mainBadge.isSuccess && allBadges.isSuccess && allBadges.data.length > 0) {
    content = (
      <>
        <header className="w-full bg-badge bg-badge_color bg-opacity-[0.12] px-6">
          <Header
            mainBadge={mainBadge.data}
            badgeCount={allBadges.data.length || 0}
            hasBadges={allBadges.data.map((badge) => badge.badgeId)}
          />
        </header>
        <div className="h-8 rounded-t-[32px] border-t w-full bg-[#F6F6F6] -translate-y-3" />
        <div className="w-full h-full p-6 overflow-y-hidden bg-[#F6F6F6] custom-scrollbar">
          <div className="h-full overflow-y-scroll custom-scrollbar">
            <Contents
              selected={selectedBadge}
              setSelected={setSelectedBadge}
              badges={allBadges.data.map((badge) => badge.badgeId)}
            />
          </div>
        </div>
      </>
    );
  } else {
    content = <div>ㅤ</div>;
  }

  return (
    <div className="max-w-[500px] w-full h-screen overflow-y-hidden flex flex-col custom-scrollbar">
      {content}
      <LoginModalNoToken
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default BadgePage;
