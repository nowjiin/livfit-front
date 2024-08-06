import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { privateApi } from "@api/axios";

import ShowBadge from "@commons/ShowBadge";
import close from "@svgs/close.svg";
import BadgeSelectModal from "./BadgeSelectModal";

const Header = ({ mainBadge, badgeCount, hasBadges }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedMain, setSelectedMain] = useState("");
  const [showSelectBadgeModal, setShowSelectBadgeModal] = useState(false);

  const mutation = useMutation({
    mutationFn: (body) => privateApi.post("/userbadges/set-main-badge", body),
    onSuccess: () => {
      setShowSelectBadgeModal(false);
      queryClient.invalidateQueries(["profile", "badge"]);
    },
  });

  return (
    <>
      <div className="flex items-center justify-between pt-10">
        <p className="text-3xl">배지</p>
        <img src={close} alt="close" onClick={() => navigate("/")} />
      </div>
      <p className="mt-[6px] text-text200">미션을 달성하고 배지를 모아보세요</p>
      <div className="flex items-center justify-between py-12">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex flex-col items-center">
            <p className="text-5xl">18</p>
            <p className="text-text200">전체 배지</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-5xl">{18 - badgeCount}</p>
            <p className="text-text200">목표 배지</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-5xl">{badgeCount}</p>
            <p className="text-text200">성공 배지</p>
          </div>
        </div>

        <ShowBadge
          name={mainBadge}
          edit
          handler={() => setShowSelectBadgeModal(true)}
        />

        {showSelectBadgeModal && (
          <BadgeSelectModal
            modalOpen={showSelectBadgeModal}
            setModalOpen={setShowSelectBadgeModal}
            badges={hasBadges}
            selected={selectedMain}
            setSelected={setSelectedMain}
            submitHandler={() => mutation.mutate({ badgeId: selectedMain })}
          />
        )}
      </div>
    </>
  );
};

export default Header;
